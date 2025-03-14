import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  // You can customize the fields according to your registration requirements
  user = {
    nom: '',
    prenom: '',
    email: '',
    password: '',
    telephone: ''
  };

  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.user).subscribe({
      next: res => {
        // On successful registration, navigate to the dashboard or another page.
        this.router.navigate(['/dashboard']);
      },
      error: err => {
        // Display the error message from the backend or a fallback message.
        this.error = err.error.data || 'Erreur lors de l\'inscription';
      }
    });
  }
}
