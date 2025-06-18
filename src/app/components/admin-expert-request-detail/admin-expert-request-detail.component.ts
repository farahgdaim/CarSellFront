import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../../services/admin.service';
import { LoadingService } from '../../services/loading.service'; // Add this import

@Component({
  selector: 'app-admin-expert-request-detail',
  templateUrl: './admin-expert-request-detail.component.html',
  styleUrls:['./admin-expert-request-detail.component.css']
})
export class AdminExpertRequestDetailComponent implements OnInit {
  requestId: string = '';
  expertRequest: any = null;
  error: string | null = null;
  modalVisible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private adminExpertService: AdminService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start

    // Get the request id from the route parameters.
    this.requestId = this.route.snapshot.paramMap.get('id') || '';
    
    // Try to load the request details from router state
    if (history.state && history.state.request) {
      this.expertRequest = history.state.request;
      this.loadingService.hide(); // Hide loader if data is already available
    } else {
      // If not available, reload all pending requests and filter by id.
      this.adminExpertService.getPendingExpertRequests().subscribe({
        next: (res: any) => {
          const requests = res.data || [];
          this.expertRequest = requests.find((req: any) => (req._id || req.id) === this.requestId);
          if (!this.expertRequest) {
            this.error = 'Demande non trouvée.';
          }
          this.loadingService.hide(); // Hide loader after data is loaded
        },
        error: (err) => {
          this.error = 'Erreur lors du chargement de la demande.';
          this.loadingService.hide(); // Hide loader on error
          console.error(err);
        }
      });
    }
  }

  acceptRequest() {
    this.loadingService.show(); // Show loader at start
    this.adminExpertService.acceptExpertRequest(this.requestId).subscribe({
      next: () => {
        this.modalVisible = true;
        this.loadingService.hide(); // Hide loader after success
        this.router.navigate(['/admin/expert-requests']); 
      },
      error: (err) => {
        this.loadingService.hide(); // Hide loader on error
        alert('Erreur lors de l\'acceptation de la demande.');
        console.error(err);
      }
    });
  }

  rejectRequest() {
    this.loadingService.show(); // Show loader at start
    this.adminExpertService.rejectExpertRequest(this.requestId).subscribe({
      next: () => {
        this.loadingService.hide(); // Hide loader after success
        this.router.navigate(['/admin/expert-requests']); 
        this.modalVisible = true;
      },
      error: (err) => {
        this.loadingService.hide(); // Hide loader on error
        alert('Erreur lors du rejet de la demande.');
        console.error(err);
      }
    });
  }

  closeModal() {
    this.modalVisible = false;
  }
}