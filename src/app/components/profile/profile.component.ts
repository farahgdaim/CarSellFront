import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  error: string | null = null;
  success: string | null = null; // au cas où vous voulez afficher un message de succès

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private loadingService: LoadingService
) {}

  ngOnInit(): void {
    // Appel à la route GET /auth/me pour récupérer les infos de l'utilisateur
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.user = res.data;
        this.loadingService.hide();
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
}
