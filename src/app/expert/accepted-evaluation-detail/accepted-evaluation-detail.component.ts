import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExpertService } from 'src/app/service/expert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { LoadingService } from 'src/app/services/loading.service';
import { UserService } from 'src/app/services/user.service';

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
 modalVisible: boolean = false;
  modalMessage: string = '';
  modalSuccess: boolean = true;
  constructor(
    private expertService: ExpertService,
    private authService: AuthService,
    private userService:UserService,
    private convService: ConversationService,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
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
    this.loading = true;
    this.expertService.getEvaluation(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.demande   = res.data.demande;
        this.annonce   = res.data.annonce;
        this.demandeur = res.data.demandeur;
        this.buildRows();
      },
      error: () => {
        this.loading = false;
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
    this.loadingService.show();
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
      complete: () => this.loadingService.hide()
    });
  }

  private navigateToConv(conv: any) {
    this.loadingService.hide();
    this.router.navigate(['/conversation', conv.Ref_id_user1, conv.Ref_id_user2], { state: { conversation: conv }});
  }

  submitReport() {
    // Serialize the rows as JSON
    const content = JSON.stringify(this.rows, null, 2);
    this.expertService.submitRapport(this.demande.id, content).subscribe({
      next: () => {
        alert('Rapport soumis avec succès.');
        this.router.navigate(['/expert/accepted']);
      },
      error: (err) => {
        console.error(err);
        alert('Erreur lors de la soumission.');
      }
    });
  }
  visioConference() {
    //this.router.navigate(['/visioconference']);
    this.modalMessage = "l'annonce est supprimé avec succès";
    this.modalSuccess = true;
    this.modalVisible = true;
  }


   closeModal() {
    this.modalVisible = false;
    
  }
  goToVisio() {
  this.router.navigate(['/visioconference']);
}
}