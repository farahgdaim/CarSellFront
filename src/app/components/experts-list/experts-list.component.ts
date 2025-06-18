import { Component, OnInit } from '@angular/core';
import { ExpertService } from '../../services/expert.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-experts-list',
  templateUrl: './experts-list.component.html',
  styleUrls: ['./experts-list.component.css']
})
export class ExpertsListComponent implements OnInit {
  experts: any[] = [];
  error: string | null = null;

  constructor(
    private expertService: ExpertService, 
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
                console.error('Erreur lors du chargement du profil utilisateur pour expert:', err);
                finishedUserRequests++;
                if (finishedUserRequests === pendingUserRequests) {
                  this.loadingService.hide(); // Hide loader after all user requests finish
                }
              }
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
      }
    });
  }

  viewExpertProfile(expert: any): void {
    const expertUserId = expert.ref_id_utilisateur;
    if (!expertUserId) {
      alert('ID expert introuvable.');
      return;
    }
    this.router.navigate(['/expert-profile', expertUserId], { state: { expert } });
  }
}