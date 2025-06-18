import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from '../../services/expert.service';
import { UserService } from '../../services/user.service';
import { ConversationService } from '../../services/conversation.service';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-expert-profile',
  templateUrl: './expert-profile.component.html',
  styleUrls: ['./expert-profile.component.css']
})
export class ExpertProfileComponent implements OnInit {
  expert: any = null;
  user: any = null;
  error: string | null = null;
  loggedInUserId: string = '';

  constructor(
    private route: ActivatedRoute,
    private expertService: ExpertService,
    private userService: UserService,
    private conversationService: ConversationService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (!userId) {
      this.error = 'Identifiant de l\'expert manquant.';
      this.loadingService.hide();
      return;
    }
    this.loadingService.show();

    // Récupérer l'identifiant de l'utilisateur connecté
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.loggedInUserId = res.data.id || res.data._id;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'utilisateur connecté", err);
      }
    });

    if (history.state && history.state.expert) {
      this.expert = history.state.expert;
      this.loadUserProfile(userId);
    } else {
      this.userService.getUserById(userId).subscribe({
        next: (res: any) => {
          this.user = res.data || res;
          this.expert = this.user.expert || null;
          this.loadingService.hide();
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement du profil expert.';
          console.error(err);
          this.loadingService.hide();
        }
      });
    }
  }

  loadUserProfile(userId: string): void {
    this.loadingService.show();
    this.userService.getUserById(userId).subscribe({
      next: (res: any) => {
        this.user = res.data || res;
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement du profil utilisateur.';
        console.error(err);
        this.loadingService.hide();
      }
    });
  }

  startConversation(targetUserId: string): void {
    this.loadingService.show();
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
        this.loadingService.hide();
      },
      error: (err) => {
        console.error("Erreur ou conversation introuvée", err);
        this.createNewConversation(targetUserId);
        this.loadingService.hide();
      }
    });
  }

  private createNewConversation(targetUserId: string): void {
    this.loadingService.show();
    this.conversationService.createConversation(targetUserId).subscribe({
      next: (createRes: any) => {
        const newConversation = createRes.data;
        const userId1 = newConversation.Ref_id_user1;
        const userId2 = newConversation.Ref_id_user2;
        this.router.navigate(['/conversation', userId1, userId2], { state: { conversation: newConversation } });
        this.loadingService.hide();
      },
      error: (createErr) => {
        alert('Erreur lors de la création de la conversation.');
        console.error('Erreur création conversation:', createErr);
        this.loadingService.hide();
      }
    });
  }
}
