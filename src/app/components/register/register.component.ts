import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

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

  success: string | null = null;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router, private loadingService: LoadingService) {}

  register() {
    this.error = null; // Reset error
    this.success = null; // Reset success
    this.loadingService.show(); // Start loading

    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        this.loadingService.hide(); // Stop loading
        if (res.status === 201) {
          this.success = 'Inscription réussie. Vous pouvez maintenant vous connecter.';
          this.router.navigate(['/login']);
        } else {
          this.error = 'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
      },
      error: (err: any) => {
        this.loadingService.hide(); // Stop loading
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
