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
    this.loadingService.show(); // Show loader at start

    this.expertService.getAllExperts().subscribe({
      next: (res: any) => {
        this.experts = res.data || [];
        let pendingUserRequests = 0;
        let finishedUserRequests = 0;

        // For each expert, fetch the user's full name from the UserService
        this.experts.forEach((expert) => {
          if (expert.ref_id_utilisateur) {
            pendingUserRequests++;
            this.userService.getUserById(expert.ref_id_utilisateur).subscribe({
              next: (userRes: any) => {
                const userData = userRes.data || userRes;
                expert.nom = userData.nom;
                expert.prenom = userData.prenom;
                finishedUserRequests++;
                if (finishedUserRequests === pendingUserRequests) {
                  this.loadingService.hide(); // Hide loader after all user requests finish
                }
              },
              error: (err) => {
                console.error(
                  'Erreur lors du chargement du profil utilisateur pour expert:',
                  err
                );
                finishedUserRequests++;
                if (finishedUserRequests === pendingUserRequests) {
                  this.loadingService.hide(); // Hide loader after all user requests finish
                }
              },
            });
          }
        });

        // If there are no user requests, hide the loader immediately
        if (pendingUserRequests === 0) {
          this.loadingService.hide();
        }
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des experts.';
        console.error(err);
        this.loadingService.hide();
      },
    });
  }

  viewExpertProfile(expert: any): void {
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
    this.loadingService.show(); // Show loader at start
    this.ref_id_annonce = this.route.snapshot.paramMap.get('id') || '';
    this.evaluationService
      .requestEvaluation(this.ref_id_annonce, expert.ref_id_utilisateur)
      .subscribe({
        next: (res: any) => {
          if (res.status === 200) {
            this.modalMessage = 'Demande d\'évaluation envoyée avec succès.';
            this.modalSuccess = true;
          } else {
            this.modalMessage = res.data || 'Une erreur est survenue.';
            this.modalSuccess = false;
          }
          this.modalVisible = true;
          this.loadingService.hide(); // Hide loader after response
        },
        error: (err) => {
          console.error('Erreur lors de la demande d’évaluation', err);
          this.modalMessage = err.error?.data || 'Une erreur est survenue lors de l’envoi.';
          this.modalSuccess = false;
          this.modalVisible = true;
          this.loadingService.hide(); // Hide loader on error
        },
      });
  }

  closeModal() {
    this.modalVisible = false;
  }
}