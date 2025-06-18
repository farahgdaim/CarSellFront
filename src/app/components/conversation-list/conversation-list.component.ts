import { Component, OnInit } from '@angular/core';
import { ConversationService } from '../../services/conversation.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit {
  conversations: any[] = [];
  error: string | null = null;
  currentUser: any;

  constructor(
    private conversationService: ConversationService,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.currentUser = res.data;
        this.loadConversations();
      },
      error: (err) => {
        this.error = 'Erreur lors de la récupération de votre profil.';
        console.error(err);
        this.loadingService.hide();
      }
    });
  }

  loadConversations(): void {
    this.conversationService.getConversations().subscribe({
      next: (res: any) => {
        let convs = res.data || [];
        let pendingUserRequests = 0;
        let finishedUserRequests = 0;

        // Pour chaque conversation, charger le nom de l'autre utilisateur
        convs.forEach((conv: any) => {
          const userId1 = conv.Ref_id_user1;
          const userId2 = conv.Ref_id_user2;
          let otherUserId: string;
          if (this.currentUser.id === userId1) {
            otherUserId = userId2;
          } else {
            otherUserId = userId1;
          }
          pendingUserRequests++;
          this.userService.getUserById(otherUserId).subscribe({
            next: (userRes: any) => {
              conv.otherUserName = (userRes.data.nom + ' ' + userRes.data.prenom) || 'Inconnu';
              finishedUserRequests++;
              if (finishedUserRequests === pendingUserRequests) {
                this.loadingService.hide();
              }
            },
            error: (err) => {
              console.error("Erreur lors du chargement des détails de l’autre utilisateur", err);
              conv.otherUserName = 'Utilisateur inconnu';
              finishedUserRequests++;
              if (finishedUserRequests === pendingUserRequests) {
                this.loadingService.hide();
              }
            }
          });
        });

        // Trier les conversations par date du dernier message (les plus récentes en premier)
        this.conversations = convs.sort((a: any, b: any) => {
          const aLastDate = (a.messages && a.messages.length > 0)
            ? new Date(a.messages[a.messages.length - 1].dateEnvoi).getTime()
            : 0;
          const bLastDate = (b.messages && b.messages.length > 0)
            ? new Date(b.messages[b.messages.length - 1].dateEnvoi).getTime()
            : 0;
          return bLastDate - aLastDate;
        });

        // Si aucune requête utilisateur n'est nécessaire, cacher le loader tout de suite
        if (pendingUserRequests === 0) {
          this.loadingService.hide();
        }
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des conversations.';
        console.error(err);
        this.loadingService.hide();
      }
    });
  }

  viewConversation(conversation: any): void {
    const userId1 = conversation.Ref_id_user1;
    const userId2 = conversation.Ref_id_user2;

    if (!userId1 || !userId2 || typeof userId1 !== 'string' || typeof userId2 !== 'string') {
      alert('Les identifiants des utilisateurs sont introuvables ou invalides.');
      return;
    }
    this.router.navigate(['/conversation', userId1, userId2], { state: { conversation } });
  }
}