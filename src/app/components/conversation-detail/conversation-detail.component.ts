import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../../services/conversation.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent implements OnInit, OnDestroy, AfterViewChecked {
  userId1: string = '';
  userId2: string = '';
  conversation: any = { messages: [] };
  newMessage: string = '';
  error: string | null = null;
  private socket!: Socket;
  test1: string = '';
  test2: string = '';

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private authService: AuthService,
    private userService: UserService,
    private zone: NgZone // Inject NgZone
  ) {}

  ngOnInit(): void {
    this.initializeSocket();

    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.userId1 = res.data.id || res.data._id;
        const test1 = this.route.snapshot.paramMap.get('userId1') || '';
        const test2 = this.route.snapshot.paramMap.get('userId2') || '';
        this.userId2 = test1 === this.userId1 ? test2 : test1;

        this.loadConversation();
        this.setupSocketListeners();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération de votre profil.';
        console.error(err);
      }
    });
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll to bottom failed:', err);
    }
  }

  private setupSocketListeners(): void {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('newMessage', (message: any) => {
      // Use NgZone to ensure Angular change detection runs
      this.zone.run(() => {
        console.log('New message received via WebSocket:', message);
        this.conversation.messages.push(message);
        // Optional: If you want to scroll immediately after receiving a new message
        setTimeout(() => this.scrollToBottom(), 100);
      });
    });

    this.socket.on('connect_error', (err: any) => {
      console.error('WebSocket connection error:', err);
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      alert('Veuillez saisir un message.');
      return;
    }

    // Include the conversation ID in the messageData
    const messageData = {
      contenu: this.newMessage,
      senderId: this.userId1,
      recipientId: this.userId2,
      conversationId: this.conversation.id // Add conversation ID here
    };

    this.conversationService.addMessage(this.userId1, this.userId2, messageData).subscribe({
      next: () => {
        this.socket.emit('sendMessage', messageData);
        this.newMessage = '';
        // Optionally, force scroll after sending a message
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err) => {
        alert('Erreur lors de l’envoi du message.');
        console.error(err);
      }
    });
  }

  loadConversation(): void {
    this.conversationService.getConversationBetweenUsers(this.userId1, this.userId2).subscribe({
      next: (res: any) => {
        this.conversation = res.data;
        this.loadUserNames();
        // Join the conversation room by emitting an event with the conversation ID
        if (this.conversation.id) {
          this.socket.emit('joinConversation', this.conversation.id);
        }
        // Scroll to bottom after loading messages
        setTimeout(() => this.scrollToBottom(), 100);
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de la conversation.';
        console.error(err);
      }
    });
  }

  private initializeSocket(): void {
    this.socket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
      console.log('Disconnected from WebSocket server');
    }
  }

  loadUserNames(): void {
    if (this.conversation) {
      this.userService.getUserById(this.userId1).subscribe({
        next: (userRes: any) => {
          this.conversation.user1 = userRes.data;
        },
        error: (err) => {
          console.error('Erreur lors du chargement des détails de l’utilisateur connecté', err);
        }
      });
      this.userService.getUserById(this.userId2).subscribe({
        next: (userRes: any) => {
          this.conversation.user2 = userRes.data;
        },
        error: (err) => {
          console.error('Error loading user2 details:', err);
        }
      });      
    }
  }
}
