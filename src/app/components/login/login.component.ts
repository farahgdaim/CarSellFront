import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };

  success: string | null = null;
  error: string | null = null;

  constructor(
    private authService: AuthService, 
    private router: Router, 
    private loadingService: LoadingService
  ) {}

  login() {
    this.error = null; // Reset error
    this.success = null; // Reset success
    this.loadingService.show(); // Start loading

    this.authService.login(this.credentials).subscribe({
      next: (res: any) => {
        this.loadingService.hide(); // Stop loading
        if (res.data && res.data.access_token) {
          // Store the token and navigate
          localStorage.setItem('authToken', res.data.access_token);
          this.success = 'Connexion réussie !';
          this.router.navigate(['/']);
        } else {
          this.error = 'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
      },
      error: (err: any) => {
        this.loadingService.hide(); // Stop loading
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
