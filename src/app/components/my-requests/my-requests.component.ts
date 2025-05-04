import { Component, OnInit } from '@angular/core';
import { EvaluationService } from '../../service/evaluation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.css']
})
export class MyRequestsComponent implements OnInit {
  myRequests: any[] = [];

  constructor(
    private evalService: EvaluationService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.evalService.getMyRequests().subscribe(res => {
      const data = res.data || [];
      this.myRequests = data.sort((a: any, b: any) => {
        const dateA = new Date(a.demande.updated_at || a.demande.created_at).getTime();
        const dateB = new Date(b.demande.updated_at || b.demande.created_at).getTime();
        return dateB - dateA; // newest first
      });
    }, err => {
      console.error('Error loading requests', err);
    });
  }

  cancel(id: string, index: number) {
    this.evalService.cancelRequest(id).subscribe(() => {
      // remove from the array you actually use
      this.myRequests.splice(index, 1);
    }, err => {
      console.error('Cancel failed', err);
      alert('Impossible d’annuler');
    });
  }

  viewDetail(item: any) {
    // use the _id field, not id
    this.router.navigate(['/mes-demandes', item.demande.id]);
  }
}
