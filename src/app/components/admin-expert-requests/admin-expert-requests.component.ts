import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-expert-requests',
  templateUrl: './admin-expert-requests.component.html'
})
export class AdminExpertRequestsComponent implements OnInit {
  expertRequests: any[] = [];
  error: string | null = null;

  constructor(private adminExpertService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadExpertRequests();
  }

  loadExpertRequests() {
    this.adminExpertService.getPendingExpertRequests().subscribe({
      next: (res: any) => {
        // Ensure we have an array of requests
        this.expertRequests = res.data || [];
        console.log('Expert requests loaded:', this.expertRequests);
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des demandes d'expert.";
        console.error(err);
      }
    });
  }

  viewRequest(request: any) {
    // Use either _id or id depending on what the backend sends
    const requestId = request._id || request.id;
    if (!requestId) {
      alert('ID de la demande introuvable');
      return;
    }
    // Pass the entire request using router state
    this.router.navigate(['/admin/expert-request', requestId], { state: { request } });
  }
}
