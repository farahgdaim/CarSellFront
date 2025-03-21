import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ConversationService } from '../../services/conversation.service';

@Component({
  selector: 'app-conversation-detail',
  templateUrl: './conversation-detail.component.html'
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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get the logged-in user's ID from AuthService
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.userId1 = res.data.id; // Initialize userId1
        this.loadConversation();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération du profil utilisateur.';
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
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement de la conversation.';
        console.error(err);
      }
    });
  }

  sendMessage(): void {
    if (!this.newMessage.trim()) {
      alert('Veuillez saisir un message.');
      return;
    }

    const messageData = { contenu: this.newMessage };
    this.conversationService.addMessage(this.userId1, this.userId2, messageData).subscribe({
      next: (res: any) => {
        alert('Message envoyé !');
        this.loadConversation(); // Reload conversation to update messages
        this.newMessage = '';
      },
      error: (err) => {
        alert('Erreur lors de l\'envoi du message.');
        console.error(err);
      }
    });
  }
}