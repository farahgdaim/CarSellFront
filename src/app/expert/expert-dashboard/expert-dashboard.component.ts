import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/service/expert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expert-dashboard',
  templateUrl: './expert-dashboard.component.html',
  styleUrls: ['./expert-dashboard.component.css']
})
export class ExpertDashboardComponent implements OnInit {
  evaluations: any[] = [];

  constructor(private expertService: ExpertService, private router: Router) { }

  ngOnInit(): void {
    this.getPendingEvaluations();
  }

  getPendingEvaluations(): void {
    this.expertService.getPendingEvaluations().subscribe((res: any) => {
      this.evaluations = (res && res.data) ? res.data : [];
    });
  }

  goToEvaluationDetails(id: string): void {
    this.router.navigate(['/expert/evaluation', id]);
  }
}
 