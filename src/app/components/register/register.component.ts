import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  user = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: ''
  };

  error: string | null = null;
  success: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.error = null; // Reset error before new registration attempt
    this.success = null; // Reset success before new registration attempt

    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        if (res.status === 201) {
          this.success = 'Inscription réussie. Vous pouvez maintenant vous connecter.';
          this.router.navigate(['/login']);
        } else {
          this.error = 'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
      },
      error: (err: any) => {
        // Handle backend errors
        if (err.status === 400) {
          this.error = 'Les informations fournies ne sont pas valides. Veuillez vérifier les champs.';
        } else if (err.status === 500) {
          this.error = 'Erreur interne du serveur. Veuillez réessayer plus tard.';
        } else {
          this.error = err.error.data || 'Erreur lors de l\'inscription.';
        }
      }
    });
  }
}
