import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/service/expert.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service'; // Add this import

@Component({
  selector: 'app-accepted-evaluations',
  templateUrl: './accepted-evaluations.component.html',
  styleUrls: ['./accepted-evaluations.component.css']
})
export class AcceptedEvaluationsComponent implements OnInit {
  demandes: any[] = [];

  constructor(
    private expertService: ExpertService,
    private router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start
    this.expertService.getAcceptedEvaluations().subscribe({
      next: (res) => {
        this.demandes = res.data || [];
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: () => {
        this.loadingService.hide(); // Hide loader on error
      }
    });
  }

  viewReportForm(id: string) {
    this.router.navigate(['/expert/accepted', id]);
  }
}