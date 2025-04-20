import { Component, OnInit } from '@angular/core';
import { ExpertService } from 'src/app/service/expert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accepted-evaluations',
  templateUrl: './accepted-evaluations.component.html',
  styleUrls: ['./accepted-evaluations.component.css']
})
export class AcceptedEvaluationsComponent implements OnInit {
  demandes: any[] = [];

  constructor(
    private expertService: ExpertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.expertService.getAcceptedEvaluations().subscribe(res => {
      this.demandes = res.data || [];
    });
  }

  viewReportForm(id: string) {
    this.router.navigate(['/expert/accepted', id]);
  }
}
