import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';


@Component({
  selector: 'app-admin-expert-request-detail',
  templateUrl: './admin-expert-request-detail.component.html',
  styleUrls: ['./admin-expert-request-detail.component.css']
})
export class AdminExpertRequestDetailComponent implements OnInit {
  requestId: string = '';
  expertRequest: any = null;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private adminExpertService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the request id from the route parameters.
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    
    // Try to load the request details from router state
    if (history.state && history.state.request) {
      this.expertRequest = history.state.request;
    } else {
      // If not available, reload all pending requests and filter by id.
      this.adminExpertService.getPendingExpertRequests().subscribe({
        next: (res: any) => {
          const requests = res.data || [];
          this.expertRequest = requests.find((req: any) => (req._id || req.id) === this.requestId);
          if (!this.expertRequest) {
            this.error = 'Demande non trouvée.';
          }
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement de la demande.';
          console.error(err);
        }
      });
    }
  }

  acceptRequest() {
    this.adminExpertService.acceptExpertRequest(this.requestId).subscribe({
      next: () => {
        alert('Demande acceptée.');
        this.router.navigate(['/admin/expert-requests']);
      },
      error: (err) => {
        alert('Erreur lors de l\'acceptation de la demande.');
        console.error(err);
      }
    });
  }

  rejectRequest() {
    this.adminExpertService.rejectExpertRequest(this.requestId).subscribe({
      next: () => {
        alert('Demande rejetée.');
        this.router.navigate(['/admin/expert-requests']);
      },
      error: (err) => {
        alert('Erreur lors du rejet de la demande.');
        console.error(err);
      }
    });
  }
}
