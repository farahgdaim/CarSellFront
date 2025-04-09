import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profile = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    password_confirmation: ''
  };

  error: string | null = null;
  success: string | null = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    // Charger les informations actuelles de l'utilisateur pour préremplir le formulaire
    this.authService.getUser().subscribe({
      next: (res: any) => {
        const data = res.data;
        this.profile.nom = data.nom;
        this.profile.prenom = data.prenom;
        this.profile.email = data.email;
        this.profile.telephone = data.telephone;
        this.loadingService.hide();
      },
      error: (err) => {
        console.error('Erreur lors du chargement du profil', err);
        this.error = "Erreur lors du chargement du profil.";
        this.loadingService.hide();
      }
    });
  }

  updateProfile() {
    // Vérifier la correspondance des mots de passe s'ils sont saisis
    if (this.profile.password || this.profile.password_confirmation) {
      if (this.profile.password !== this.profile.password_confirmation) {
        this.error = 'Les mots de passe ne correspondent pas';
        return;
      }
    }
    this.loadingService.show();
    this.userService.updateProfile(this.profile).subscribe({
      next: (res: any) => {
        this.success = 'Profil mis à jour avec succès';
        this.error = null;
        this.loadingService.hide();
        // Navigation vers la page profil après une mise à jour réussie
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        this.error = err.error.data || 'Erreur lors de la mise à jour du profil';
        this.success = null;
        this.loadingService.hide();
      }
    });
  }
}
