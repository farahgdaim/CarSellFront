import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationService } from '../../service/evaluation.service';

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
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.evalService.getMyRequests().subscribe(res => {
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
    });
  }
}
