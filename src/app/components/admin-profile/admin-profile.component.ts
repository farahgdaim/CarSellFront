import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  // styleUrls: ['./admin-profile.component.css'] Uncomment this when you're using CSS for styling
})
export class AdminProfileComponent implements OnInit {
  admin: any = null;
  error: string | null = null;

  constructor(private adminAuth: AdminAuthService, private router: Router) {}

  ngOnInit(): void {
    this.adminAuth.getAdmin().subscribe({
      next: (res: any) => {
        this.admin = res?.data || null;
      },
      error: (err) => {
        console.error('Error while loading admin profile:', err); // Log error if the request fails
        this.error = 'Erreur lors du chargement du profil.';
        this.admin = null; // Clear the admin data in case of error
        this.router.navigate(['/admin/login']); // Redirect if necessary
      }
    });
  }
  

  logout(): void {
    this.adminAuth.logout().subscribe({
      next: () => {
        this.router.navigate(['/admin/login']); // Redirect to login on success
      },
      error: (err) => {
        console.error('Erreur lors de la déconnexion', err);
        this.error = 'Erreur lors de la déconnexion.'; // Optional user feedback
      }
    });
  }
}
