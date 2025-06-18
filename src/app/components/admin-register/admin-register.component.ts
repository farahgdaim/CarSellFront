import { Component } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css'],
})
export class AdminRegisterComponent {
  adminData = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    code: '',
  };
  error: string | null = null;
  success: string | null = null;
  constructor(
    private adminAuth: AdminAuthService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  register() {
    this.error = null; // Reset error
    this.success = null; // Reset success
    this.loadingService.show(); // Show loader at start
    if (this.adminData.code !== '060703') {
      this.error = "Code d'accès invalide.";
      this.loadingService.hide(); // Hide loader if code is invalid
      return;
    }

    this.adminAuth.register(this.adminData).subscribe({
      next: (res) => {
        this.loadingService.hide(); // Hide loader after response
        if (res.status === 201) {
          this.success =
            'Inscription réussie. Vous pouvez maintenant vous connecter.';
          this.router.navigate(['/admin/login']);
        } else {
          this.error =
            'Une erreur inattendue est survenue. Veuillez réessayer.';
        }
      },
      error: (err: any) => {
        this.loadingService.hide(); // Hide loader on error
        if (err.status === 400) {
          this.error =
            'Les informations fournies ne sont pas valides. Veuillez vérifier les champs.';
        } else if (err.status === 500) {
          this.error =
            'Erreur interne du serveur. Veuillez réessayer plus tard.';
        } else {
          this.error = err.error.data || "Erreur lors de l'inscription.";
        }
      },
    });
  }
}