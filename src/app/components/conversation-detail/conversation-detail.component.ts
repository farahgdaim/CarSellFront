import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConversationService } from '../../services/conversation.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html',
  styleUrls: ['./conversation-detail.component.css']
})
export class ConversationDetailComponent implements OnInit {
  userId1: string = ''; // ID of the logged-in user
  userId2: string = ''; // ID of the other user in the conversation
  conversation: any = null;
  newMessage: string = '';
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private conversationService: ConversationService,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the logged-in user's ID from AuthService
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.userId1 = res.data.id; // Initialize userId1
        this.loadConversation();
      },
      error: (err) => {
        this.error = 'Error retrieving your profile.';
        console.error(err);
      }
    });

    // Get the other user's ID from route params
    this.userId2 = this.route.snapshot.paramMap.get('userId2') || '';
  }

  loadConversation(): void {
    this.conversationService.getConversationBetweenUsers(this.userId1, this.userId2).subscribe({
      next: (res: any) => {
        this.conversation = res.data;
        // Fetch user names from the utilisateur collection using the user IDs.
        this.loadUserNames();
      },
      error: (err) => {
        this.error = 'Error loading the conversation.';
        console.error(err);
      }
    });
  }

  loadUserNames(): void {
    // Assuming conversation object contains user1 and user2 IDs as properties.
    if (this.conversation) {
      // Fetch details for user1 if not already available.
      this.userService.getUserById(this.userId1).subscribe({
        next: (userRes: any) => {
          this.conversation.user1 = userRes.data; // assuming the response contains a data property with user info
        },
        error: (err) => {
          console.error('Error fetching logged-in user details', err);
        }
      });
      
      // Fetch details for user2.
      this.userService.getUserById(this.userId2).subscribe({
        next: (userRes: any) => {
          this.conversation.user2 = userRes.data;
        },
        error: (err) => {
          console.error('Error fetching other user details', err);
        }
      });
    }
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      alert('Please enter a message.');
      return;
    }

    const messageData = { contenu: this.newMessage };
    this.conversationService.addMessage(this.userId1, this.userId2, messageData).subscribe({
      next: (res: any) => {
        this.loadConversation(); // Reload conversation to update messages
        this.newMessage = '';
      },
      error: (err) => {
        alert('Error sending your message.');
        console.error(err);
      }
    });
  }
}
