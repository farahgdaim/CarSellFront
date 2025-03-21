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
    const conversationId = conversation._id || conversation.id;
    if (!conversationId) {
      alert('Identifiant de conversation introuvable.');
      return;
    }
    // Pass the conversation in router state for convenience
    this.router.navigate(['/conversation', conversationId], { state: { conversation } });
  }
}
