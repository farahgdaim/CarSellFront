import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../service/evaluation.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service'; // Add this import

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {
  myRequests: any[] = [];

  constructor(
    private evalService: EvaluationService,
    public router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start
    this.evalService.getMyRequests().subscribe(res => {
      const data = res.data || [];
      this.myRequests = data.sort((a: any, b: any) => {
        const dateA = new Date(a.demande.updated_at || a.demande.created_at).getTime();
        const dateB = new Date(b.demande.updated_at || b.demande.created_at).getTime();
        return dateB - dateA; // newest first
      });
      this.loadingService.hide(); // Hide loader after data is loaded
    }, err => {
      console.error('Error loading requests', err);
      this.loadingService.hide(); // Hide loader on error
    });
  }

  cancel(id: string, index: number) {
    this.loadingService.show(); // Show loader at start
    this.evalService.cancelRequest(id).subscribe(() => {
      // remove from the array you actually use
      this.myRequests.splice(index, 1);
      this.loadingService.hide(); // Hide loader after cancel
    }, err => {
      console.error('Cancel failed', err);
      alert('Impossible d’annuler');
      this.loadingService.hide(); // Hide loader on error
    });
  }

  viewDetail(item: any) {
    // use the _id field, not id
    this.router.navigate(['/mes-demandes', item.demande.id]);
  }
}