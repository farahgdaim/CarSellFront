import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html'
})
export class ConversationListComponent implements OnInit {
  conversations: any[] = [];
  error: string | null = null;

  constructor(
    private conversationService: ConversationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  loadConversations(): void {
    this.conversationService.getConversations().subscribe({
      next: (res: any) => {
        this.conversations = res.data || [];
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des conversations.';
        console.error(err);
      }
    });
  }
  viewConversation(conversation: any): void {
    if (!conversation || !conversation.Ref_id_user1 || !conversation.Ref_id_user2) {
      alert('Les identifiants des utilisateurs sont introuvables.');
      return;
    }
  
    const userId1 = conversation.Ref_id_user1;
    const userId2 = conversation.Ref_id_user2;
  
    // Validate user IDs
    if (typeof userId1 !== 'string' || userId1.trim() === '' || typeof userId2 !== 'string' || userId2.trim() === '') {
      alert('Les identifiants des utilisateurs sont invalides.');
      return;
    }
  
    // Navigate to the conversation detail page with the two user IDs
    this.router.navigate(['/conversation', userId1, userId2]);
  }
}  