import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/service/expert.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service'; // Add this import

@Component({
  selector: 'app-expert-dashboard',
  templateUrl: './expert-dashboard.component.html',
  styleUrls: ['./expert-dashboard.component.css']
})
export class ExpertDashboardComponent implements OnInit {
  evaluations: any[] = [];

  constructor(
    private expertService: ExpertService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) { }

  ngOnInit(): void {
    this.getPendingEvaluations();
  }

  getPendingEvaluations(): void {
    this.loadingService.show(); // Show loader at start
    this.expertService.getPendingEvaluations().subscribe({
      next: (res: any) => {
        this.evaluations = (res && res.data) ? res.data : [];
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: () => {
        this.loadingService.hide(); // Hide loader on error
      }
    });
  }

  goToEvaluationDetails(id: string): void {
    this.router.navigate(['/expert/evaluation', id]);
  }
}