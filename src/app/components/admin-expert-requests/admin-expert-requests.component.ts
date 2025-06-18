import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service'; // Add this import

@Component({
  selector: 'app-admin-expert-requests',
  templateUrl: './admin-expert-requests.component.html',
  styleUrls:['./admin-expert-requests.component.css']
})
export class AdminExpertRequestsComponent implements OnInit {
  expertRequests: any[] = [];
  error: string | null = null;

  constructor(
    private adminExpertService: AdminService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start
    this.loadExpertRequests();
  }

  loadExpertRequests() {
    this.adminExpertService.getPendingExpertRequests().subscribe({
      next: (res: any) => {
        this.expertRequests = res.data || [];
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des demandes d'expert.";
        this.loadingService.hide(); // Hide loader on error
        console.error(err);
        this.router.navigate(['/admin/login']);
      }
    });
  }

  viewRequest(request: any) {
    const requestId = request._id || request.id;
    if (!requestId) {
      alert('ID de la demande introuvable');
      return;
    }
    this.router.navigate(['/admin/expert-request', requestId], { state: { request } });
  }
}