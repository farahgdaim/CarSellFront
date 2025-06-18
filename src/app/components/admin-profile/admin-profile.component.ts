import { Component, OnInit } from '@angular/core';
import { AdminAuthService } from '../../services/admin-auth.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service'; // Add this import

@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.css'] 
})
export class AdminProfileComponent implements OnInit {
  admin: any = null;
  error: string | null = null;

  constructor(
    private adminAuth: AdminAuthService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start
    this.adminAuth.getAdmin().subscribe({
      next: (res: any) => {
        this.admin = res?.data || null;
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: (err) => {
        console.error('Error while loading admin profile:', err); // Log error if the request fails
        this.error = 'Erreur lors du chargement du profil.';
        this.admin = null; // Clear the admin data in case of error
        this.loadingService.hide(); // Hide loader on error
        this.router.navigate(['/admin/login']); // Redirect if necessary
      }
    });
  }
  
  logout(): void {
    this.loadingService.show(); // Show loader at start
    this.adminAuth.logout().subscribe({
      next: () => {
        this.loadingService.hide(); // Hide loader after logout
        this.router.navigate(['/admin/login']); // Redirect to login on success
      },
      error: (err) => {
        this.loadingService.hide(); // Hide loader on error
        console.error('Erreur lors de la déconnexion', err);
        this.error = 'Erreur lors de la déconnexion.'; // Optional user feedback
      }
    });
  }
}