import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../service/evaluation.service';
import { LoadingService } from 'src/app/services/loading.service'; 

@Component({
  selector: 'app-my-request-detail',
  templateUrl: './my-request-detail.component.html',
  styleUrls: ['./my-request-detail.component.css']
})
export class MyRequestDetailComponent implements OnInit {
  item: any = null;
  reportRows: { 
    name: string;
    annonceValue: any;
    realValue: string;
    match: boolean;
  }[] = [];
  constructor(
    private route: ActivatedRoute,
    private evalService: EvaluationService,
    public router: Router,
    private loadingService: LoadingService // Inject LoadingService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.loadingService.show(); // Show loader at start
    this.evalService.getMyRequests().subscribe({
      next: (res) => {
        const found = res.data.find((d: any) => d.demande.id === id);
        if (!found) {
          alert('Demande introuvable');
          this.router.navigate(['/mes-demandes']);
        } else {
          this.item = found;
          if (this.item.rapport?.contenu) {
            try {
              this.reportRows = JSON.parse(this.item.rapport.contenu);
            } catch(e) {
              console.error('Erreur parsing rapport:', e);
            }
          }
        }
        this.loadingService.hide(); // Hide loader after data is loaded
      },
      error: () => {
        this.loadingService.hide(); // Hide loader on error
      }
    });
  }
}