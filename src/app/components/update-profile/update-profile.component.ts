import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html'
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
    private router: Router
  ) {}

  ngOnInit(): void {
    // Optionnel : charger les informations actuelles de l'utilisateur pour préremplir le formulaire
    this.authService.getUser().subscribe({
      next: (res: any) => {
        const data = res.data;
        this.profile.nom = data.nom;
        this.profile.prenom = data.prenom;
        this.profile.email = data.email;
        this.profile.telephone = data.telephone;
      },
      error: (err) => console.error('Erreur lors du chargement du profil', err)
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
    this.userService.updateProfile(this.profile).subscribe({
      next: (res: any) => {
        this.success = 'Profil mis à jour avec succès';
        this.error = null;
        // Navigate back to the profile page after a successful update
        this.router.navigate(['/profile']);
      },
      error: (err: any) => {
        this.error = err.error.data || 'Erreur lors de la mise à jour du profil';
        this.success = null;
      }
    });
  }
}
