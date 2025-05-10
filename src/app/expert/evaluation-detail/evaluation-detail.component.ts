import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-evaluation-detail',
  templateUrl: './evaluation-detail.component.html',
  styleUrls: ['./evaluation-detail.component.css']
})
export class EvaluationDetailComponent implements OnInit {
  demande: any;
  annonce: any;
  demandeur: any;
  rapportContent = '';
  loading = false;

  // Logged‑in expert ID
  currentUserId = '';

  constructor(
    private expertService: ExpertService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private conversationService: ConversationService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    // 1️⃣ Get the logged‑in expert’s ID
    this.authService.getUser().subscribe({
      next: (res: any) => {
        const u = res.data;
        this.currentUserId = u.id;
      },
      error: (err) => {
        console.error('Erreur récupération profil expert', err);
      }
    });

    // 2️⃣ Load the evaluation request details
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.loadDetail(id);
    });
  }

  loadDetail(id: string) {
    this.loading = true;
    this.expertService.getEvaluation(id).subscribe({
      next: (res) => {
        this.loading   = false;
        this.demande   = res.data.demande;
        this.annonce   = res.data.annonce;
        this.demandeur = res.data.demandeur;
        
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert('Impossible de charger les détails.');
        this.router.navigate(['/expert']);
      }
    });
  }

  /** 
   * Start or create a conversation with the annonce owner
   */
  contactOwner(): void {
    if (!this.currentUserId || !this.annonce.Ref_id_user) {
      alert('Impossible de contacter le propriétaire (ID manquant).');
      return;
    }

    this.loadingService.show();
    // Try to fetch an existing conversation
    this.conversationService
      .getConversationBetweenUsers(this.currentUserId, this.annonce.Ref_id_user)
      .subscribe({
        next: (res: any) => {
          if (res?.status === 200 && res.data) {
            const conv = res.data;
            this.navigateToConversation(conv);
          } else {
            this.createNewConversation();
          }
        },
        error: () => {
          this.createNewConversation();
        }
      });
  }

  private createNewConversation(): void {
    this.conversationService
      .createConversation(this.annonce.Ref_id_user)
      .subscribe({
        next: (createRes: any) => {
          const conv = createRes.data;
          this.navigateToConversation(conv);
        },
        error: (err) => {
          console.error('Erreur création conversation:', err);
          alert('Impossible de créer la conversation.');
        },
        complete: () => this.loadingService.hide()
      });
  }

  private navigateToConversation(conv: any): void {
    this.loadingService.hide();
    const id1 = conv.Ref_id_user1;
    const id2 = conv.Ref_id_user2;
    this.router.navigate(['/conversation', id1, id2], { state: { conversation: conv } });
  }

  accept() {
    this.expertService.acceptEvaluation(this.demande.id).subscribe({
      next: () => alert('Demande acceptée ! Pensez à confirmer le rendez‑vous.'),
      error: (err) => {
        console.error(err);
        alert('Erreur lors de l’acceptation.');
      }
    });
  }

  reject() {
    this.expertService.rejectEvaluation(this.demande.id).subscribe({
      next: () => this.router.navigate(['/expert']),
      error: (err) => {
        console.error(err);
        alert('Erreur lors du rejet.');
      }
    });
  }

  submitReport() {
    if (!this.rapportContent.trim()) {
      alert('Veuillez rédiger le rapport.');
      return;
    }
    this.expertService.submitRapport(this.demande.id, this.rapportContent).subscribe({
      next: () => {
        alert('Rapport soumis avec succès.');
        this.router.navigate(['/expert']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la soumission du rapport.');
      }
    });
  }
}
