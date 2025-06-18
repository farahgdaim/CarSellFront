import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewChecked, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConversationService } from '../../services/conversation.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { io, Socket } from 'socket.io-client';
import { LoadingService } from '../../services/loading.service';

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

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private authService: AuthService,
    private userService: UserService,
    private zone: NgZone,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.initializeSocket();
    this.loadingService.show();
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.userId1 = res.data.id || res.data._id;
        const paramUserId1 = this.route.snapshot.paramMap.get('userId1') || '';
        const paramUserId2 = this.route.snapshot.paramMap.get('userId2') || '';
        this.userId2 = paramUserId1 === this.userId1 ? paramUserId2 : paramUserId1;

        this.loadConversation();
        this.setupSocketListeners();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération de votre profil.';
        console.error(err);
        this.loadingService.hide();
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
      
    });

    this.socket.on('newMessage', (message: any) => {
      this.zone.run(() => {
       
        this.conversation.messages.push(message);
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

    const messageData = {
      contenu: this.newMessage,
      senderId: this.userId1,
      recipientId: this.userId2,
      conversationId: this.conversation.id
    };
    this.loadingService.show();
    this.conversationService.addMessage(this.userId1, this.userId2, messageData).subscribe({
      next: () => {
        this.socket.emit('sendMessage', messageData);
        this.newMessage = '';
        setTimeout(() => this.scrollToBottom(), 100);
        this.loadingService.hide();
      },
      error: (err) => {
        alert('Erreur lors de l’envoi du message.');
        console.error(err);
        this.loadingService.hide();
      }
    });
  }

  loadConversation(): void {
    this.loadingService.show();
    this.conversationService.getConversationBetweenUsers(this.userId1, this.userId2).subscribe({
      next: (res: any) => {
        this.conversation = res.data;
        this.loadUserNames();
        if (this.conversation.id) {
          this.socket.emit('joinConversation', this.conversation.id);
        }
        setTimeout(() => this.scrollToBottom(), 100);
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de la conversation.';
        console.error(err);
        this.loadingService.hide();
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
      
    }
  }

  loadUserNames(): void {
    if (this.conversation) {
      this.loadingService.show();
      this.userService.getUserById(this.userId1).subscribe({
        next: (userRes: any) => {
          this.conversation.user1 = userRes.data;
          this.loadingService.hide();
        },
        error: (err) => {
          console.error('Erreur lors du chargement des détails de l’utilisateur connecté', err);
          this.loadingService.hide();
        }
      });
      this.loadingService.show();
      this.userService.getUserById(this.userId2).subscribe({
        next: (userRes: any) => {
          this.conversation.user2 = userRes.data;
          this.loadingService.hide();
        },
        error: (err) => {
          console.error('Erreur lors du chargement des détails de l’utilisateur destinataire', err);
          this.loadingService.hide();
        }
      });      
    }
  }
}
