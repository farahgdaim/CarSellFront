import { Component } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.css']
})
export class AdminRegisterComponent {
  adminData = {
    nom: '',
    prenom:'',
    email: '',
    password: ''
  };
  error: string | null = null;

  constructor(private adminAuth: AdminAuthService, private router: Router) {}

  register() {
    this.adminAuth.register(this.adminData).subscribe({
      next: res => {
        // On successful registration, navigate to login page.
        this.router.navigate(['/admin/login']);
      },
      error: err => {
        this.error = err.error.data || 'Erreur lors de l’inscription';
      }
    });
  }
}
