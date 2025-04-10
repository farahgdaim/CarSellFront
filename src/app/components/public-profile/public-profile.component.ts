import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ConversationService } from '../../services/conversation.service';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-public-profile',
  templateUrl: './public-profile.component.html',
  styleUrls: ['./public-profile.component.css']
})
export class PublicProfileComponent implements OnInit {
  user: any = null;
  loggedInUserId: string = '';
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService

  ) {}

  ngOnInit(): void {
    const targetUserId = this.route.snapshot.paramMap.get('id');
    if (!targetUserId) {
      this.error = 'Identifiant utilisateur manquant.';
      this.loadingService.hide();
      return;
    }
    // Charger le profil de l'utilisateur cible
    this.userService.getUserById(targetUserId).subscribe({
      next: (res: any) => {
        this.user = res.data || res;
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du profil.';
        console.error(err);
        this.loadingService.hide();
      }
    });

    // Récupérer l'identifiant de l'utilisateur connecté
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.loggedInUserId = res.data.id || res.data._id;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du profil connecté', err);
      }
    });
  }

  startConversation(targetUserId: string): void {
    this.conversationService.getConversationBetweenUsers(this.loggedInUserId, targetUserId).subscribe({
      next: (res: any) => {
        if (res && res.status === 200 && res.data) {
          const conv = res.data;
          const userId1 = conv.Ref_id_user1;
          const userId2 = conv.Ref_id_user2;
          this.router.navigate(['/conversation', userId1, userId2], { state: { conversation: conv } });
        } else {
          this.createNewConversation(targetUserId);
        }
      },
      error: (err) => {
        console.error("Erreur ou conversation introuvée", err);
        this.createNewConversation(targetUserId);
      }
    });
  }

  private createNewConversation(targetUserId: string): void {
    this.conversationService.createConversation(targetUserId).subscribe({
      next: (createRes: any) => {
        const newConversation = createRes.data;
        const userId1 = newConversation.Ref_id_user1;
        const userId2 = newConversation.Ref_id_user2;
        this.router.navigate(['/conversation', userId1, userId2], { state: { conversation: newConversation } });
      },
      error: (createErr) => {
        alert('Erreur lors de la création de la conversation.');
        console.error('Erreur création conversation:', createErr);
      }
    });
  }
}
