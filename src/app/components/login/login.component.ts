import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error = null; // Reset error before new login attempt

    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        if (res.data && res.data.access_token) {
          // Store the token and navigate
          localStorage.setItem('authToken', res.data.access_token);
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
      },
      error: (err: any) => {
        // Handle backend errors
        if (err.status === 401) {
          this.error = 'Identifiants invalides. Veuillez vérifier vos informations.';
        } else if (err.status === 500) {
          this.error = 'Erreur interne du serveur. Veuillez réessayer plus tard.';
        } else {
          this.error = err.error.data || 'Erreur lors de la connexion.';
        }
      }
    });
  }
}
