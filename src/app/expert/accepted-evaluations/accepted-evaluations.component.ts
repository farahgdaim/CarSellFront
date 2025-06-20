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
evaluationDetails: { [key: string]: { demandeur?: any, annonce?: any } } = {};
  annonce: any;
  demandeur: any;
   isLoading = false;
  constructor(
    private expertService: ExpertService,
    private router: Router,
     private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show(); // Show loader at start
    this.expertService.getAcceptedEvaluations().subscribe(res => {
      this.demandes = res.data || [];
      this.demandes.forEach(evaluation  => {
        this.expertService.getEvaluation(evaluation .id).subscribe((resultat: any) => {
          this.evaluationDetails[evaluation .id] = {
            demandeur: resultat.data?.demandeur,
            annonce: resultat.data?.annonce
          }; 
          
          /* this.demandeur= resultat.demandeur;
          this.annonce =resultat.annonce; */
        });
      });
    });
    
    this.loadingService.hide();

    
  }

  viewReportForm(id: string) {
    this.router.navigate(['/expert/accepted', id]);
  }
}