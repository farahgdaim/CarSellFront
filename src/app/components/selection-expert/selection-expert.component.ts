import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ExpertService } from 'src/app/services/expert.service';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';
import { EvaluationService } from 'src/app/service/evaluation.service';
@Component({
  selector: 'app-selection-expert',
  templateUrl: './selection-expert.component.html',
  styleUrls: ['./selection-expert.component.css'],
})
export class SelectionExpertComponent implements OnInit {
  experts: any[] = [];
  error: string | null = null;
  modalVisible = false;
  modalMessage = '';
  modalSuccess = false;
  ref_id_annonce: string = '';
  constructor(
    private route: ActivatedRoute,
    private expertService: ExpertService,
    private evaluationService: EvaluationService,
    private userService: UserService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadExperts();
  }
  loadExperts(): void {
    // Show loading spinner
    this.loadingService.show();

    this.expertService.getAllExperts().subscribe({
      next: (res: any) => {
        this.experts = res.data || [];
        // For each expert, fetch the user's full name from the UserService
        this.experts.forEach((expert) => {
          if (expert.ref_id_utilisateur) {
            this.userService.getUserById(expert.ref_id_utilisateur).subscribe({
              next: (userRes: any) => {
                const userData = userRes.data || userRes;
                expert.nom = userData.nom;
                expert.prenom = userData.prenom;
              },
              error: (err) => {
                console.error(
                  'Erreur lors du chargement du profil utilisateur pour expert:',
                  err
                );
              },
            });
          }
        });
        // Hide loading spinner after experts have been retrieved
        this.loadingService.hide();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des experts.';
        console.error(err);
        this.loadingService.hide();
      },
    });
  }

  viewExpertProfile(expert: any): void {
    // Navigate to the expert's public profile page using their ref_id_utilisateur.
    const expertUserId = expert.ref_id_utilisateur;
    if (!expertUserId) {
      alert('ID expert introuvable.');
      return;
    }
    this.router.navigate(['/expert-profile', expertUserId], {
      state: { expert },
    });
  }
 
  demanderEvaluation(expert: any) {
    this.ref_id_annonce = this.route.snapshot.paramMap.get('id') || '';
    this.evaluationService
      .requestEvaluation(this.ref_id_annonce, expert.ref_id_utilisateur)
      .subscribe({
        next: (res: any) => {
          console.log("lid de l'annonce ", this.ref_id_annonce);
          console.log("l'id de l'expert ", expert.ref_id_utilisateur);

          if (res.status === 200) {
            this.modalMessage = 'Demande d\'évaluation envoyée avec succès.';
            this.modalSuccess = true;
          } else {
            this.modalMessage = res.data || 'Une erreur est survenue.';
            this.modalSuccess = false;
          }
    
          this.modalVisible = true;
        
        },
        error: (err) => {
          console.error('Erreur lors de la demande d’évaluation', err);
          this.modalMessage = err.error?.data || 'Une erreur est survenue lors de l’envoi.';
          this.modalSuccess = false;
          this.modalVisible = true;
        },
      });
  }
  closeModal() {
    this.modalVisible = false;
  }
}
