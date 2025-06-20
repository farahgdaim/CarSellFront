import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/service/expert.service';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loading.service'; // Add this import

@Component({
  selector: 'app-expert-dashboard',
  templateUrl: './expert-dashboard.component.html',
  styleUrls: ['./expert-dashboard.component.css'],
})
export class ExpertDashboardComponent implements OnInit {
  evaluations: any[] = [];
  evaluationDetails: { [key: string]: { demandeur: any, annonce: any } } = {};
  annonce: any;
  demandeur: any;

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
    this.expertService.getPendingEvaluations().subscribe((res: any) => {
      this.evaluations = res && res.data ? res.data : [];
      
      this.evaluations.forEach(evaluation  => {
      this.expertService.getEvaluation(evaluation .id).subscribe((resultat: any) => {
       this.evaluationDetails[evaluation .id] = {
         demandeur: resultat.data.demandeur,
         annonce: resultat.data.annonce
        }; 
        this.loadingService.hide(); // Hide loader after data is loaded
        /* this.demandeur= resultat.demandeur;
        this.annonce =resultat.annonce; */
      });
    });
    });
  }
  /* triggerLoading(id: string) {
    this.loading(id);
   return true
  } */

  loading(id: string) {
    this.expertService.getEvaluation(id).subscribe({
      next: (resultat: any) => {
        

        this.demandeur = resultat.data.demandeur;
        this.annonce = resultat.data.annonce;
      },
    });
  }
  goToEvaluationDetails(id: string): void {
    this.router.navigate(['/expert/evaluation', id]);
  }
}