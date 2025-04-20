import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';
import { EvaluationService } from '../../service/evaluation.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  error: string | null = null;
  success: string | null = null; // au cas où vous voulez afficher un message de succès
  myRequests: any[] = [];
  requestError: string | null = null;
  
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private loadingService: LoadingService,
    private evalService: EvaluationService
) {}

  ngOnInit(): void {
    // Appel à la route GET /auth/me pour récupérer les infos de l'utilisateur
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.user = res.data;
        this.loadingService.hide();
        // → Load the user's evaluation requests
        this.evalService.getMyRequests().subscribe({
          next: (r: any) => {
          const data = r.data || [];
          this.myRequests = data.sort((a: any, b: any) => {
            // parse updated_at; fallback to created_at if needed
            const dateA = new Date(a.demande.updated_at || a.demande.created_at).getTime();
            const dateB = new Date(b.demande.updated_at || b.demande.created_at).getTime();
            return dateB - dateA; // newest first
          });
          },
          error: (err) => {
            console.error('Erreur lors du chargement des demandes', err);
            this.requestError = 'Impossible de charger vos demandes.';
          }
        });
        
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
        this.error = "Erreur lors du chargement du profil.";
        this.loadingService.hide();
      }
    });
  }

  // Déconnexion via la route POST /auth/logout
  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion', err);
        this.error = "Erreur lors de la déconnexion. Veuillez réessayer.";
      }
    });
  }

  // Navigation vers la page de mise à jour du profil
  goToUpdateProfile(): void {
    this.router.navigate(['/update-profile']);
  }

  // Cancel a pending request
  cancel(requestId: string, index: number): void {
    this.evalService.cancelRequest(requestId).subscribe({
      next: () => this.myRequests.splice(index, 1),
      error: () => alert('Impossible d’annuler la demande.')
    });
  }

  // Navigate to the detail/report page
  viewRequestDetail(requestId: string): void {
    this.router.navigate(['/mes-demandes', requestId]);
  }
}
