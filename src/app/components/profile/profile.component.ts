import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  error: string | null = null;
  
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Appel à la route GET /auth/me pour récupérer les infos de l'utilisateur
    this.authService.getUser().subscribe({
      next: (res: any) => {
        this.user = res.data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
        this.error = "Erreur lors du chargement du profil.";
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
      }
    });
  }

  // Navigation vers la page de mise à jour du profil
  goToUpdateProfile(): void {
    this.router.navigate(['/update-profile']);
  }
}
