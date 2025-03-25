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
    // Use fallback if necessary (check _id or id)
    const userId1 = conversation.Ref_id_user1;
    const userId2 = conversation.Ref_id_user2;

    if (!userId1 || !userId2 || typeof userId1 !== 'string' || typeof userId2 !== 'string') {
      alert('Les identifiants des utilisateurs sont introuvables ou invalides.');
      return;
    }
  
    // Navigate to the conversation detail page with the two user IDs
    this.router.navigate(['/conversation', userId1, userId2], { state: { conversation } });
  }
}
