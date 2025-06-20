import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { LoadingService } from 'src/app/services/loading.service';

interface Row { 
  name: string; 
  annonceValue: any; 
  realValue: any; 
  match: boolean;
}

@Component({
  selector: 'app-accepted-evaluation-detail',
  templateUrl: './accepted-evaluation-detail.component.html',
  styleUrls: ['./accepted-evaluation-detail.component.css']
})
export class AcceptedEvaluationDetailComponent implements OnInit {
  demande: any;
  annonce: any;
  demandeur: any;
  rows: Row[] = [];
  loading = false;

  currentUserId = '';

  constructor(
    private expertService: ExpertService,
    private authService: AuthService,
    private convService: ConversationService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start
    this.authService.getUser().subscribe(res => {
      const u = res.data;
      this.currentUserId = u.id;
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.loadDetail(id);
    });
  } 

  loadDetail(id: string) {
    this.loadingService.show(); // Show loader at start
    this.expertService.getEvaluation(id).subscribe({
      next: (res) => {
        this.demande   = res.data.demande;
        this.annonce   = res.data.annonce;
        console.log('Evaluation Details:', res.data);
        this.demandeur = res.data.demandeur;
        this.buildRows();
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: () => {
        this.loadingService.hide(); // Hide loader on error
        alert('Impossible de charger les détails.');
        this.router.navigate(['/expert/accepted']);
      }
    });
  }

  buildRows() {
    const veh = this.annonce.vehicule || {};
    this.rows = Object.keys(veh).map(k => ({
      name: k,
      annonceValue: veh[k],
      realValue: '',
      match: false
    }));
  }

  /** Same start/conversation logic as before **/
  contactOwner() {
    if (!this.currentUserId || !this.annonce.Ref_id_user) {
      alert('ID manquant.');
      return;
    }
    this.loadingService.show(); // Show loader at start
    this.convService
      .getConversationBetweenUsers(this.currentUserId, this.annonce.Ref_id_user)
      .subscribe({
        next: (res: any) => {
          if (res.status === 200 && res.data) {
            this.navigateToConv(res.data);
          } else this.createConv();
        },
        error: () => this.createConv()
      });
  }

  private createConv() {
    this.convService.createConversation(this.annonce.Ref_id_user).subscribe({
      next: (cr: any) => this.navigateToConv(cr.data),
      error: () => alert('Erreur création conversation'),
      complete: () => this.loadingService.hide() // Hide loader after complete
    });
  }

  private navigateToConv(conv: any) {
    this.loadingService.hide(); // Hide loader after navigation
    this.router.navigate(['/conversation', conv.Ref_id_user1, conv.Ref_id_user2], { state: { conversation: conv }});
  }

  submitReport() {
    this.loadingService.show(); // Show loader at start
    // Serialize the rows as JSON
    const content = JSON.stringify(this.rows, null, 2);
    this.expertService.submitRapport(this.demande.id, content).subscribe({
      next: () => {
        this.loadingService.hide(); // Hide loader after success
        alert('Rapport soumis avec succès.');
        this.router.navigate(['/expert/accepted']);
      },
      error: (err) => {
        this.loadingService.hide(); // Hide loader on error
        console.error(err);
        alert('Erreur lors de la soumission.');
      }
    });
  }
}