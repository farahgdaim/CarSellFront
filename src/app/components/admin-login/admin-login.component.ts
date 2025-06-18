import { Component } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service'; // Add this import

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  error: string | null = null;

  constructor(
    private adminAuth: AdminAuthService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  login() {
    this.error = null; // Reset error before new login attempt

    if (!this.credentials.email ) {
      this.error = 'Veuillez entrer votre adresse e-mail.';
      return;
    }
    if(!this.credentials.password){
      this.error = 'Veuillez entrer votre mot de passe .';
      return;
    }

    this.loadingService.show(); // Show loader at start

    this.adminAuth.login(this.credentials).subscribe({
      next: (res: any) => {
        this.loadingService.hide(); // Hide loader after response
        if (res.data && res.data.access_token) {
          // Store the token and navigate
          // localStorage.setItem('authToken', res.data.access_token);
          this.router.navigate(['admin/dashboard']);
        } else {
          this.error = 'Identifiants invalides. Veuillez vérifier vos informations.';
        }
      },
      error: (err: any) => {
        this.loadingService.hide(); // Hide loader on error
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