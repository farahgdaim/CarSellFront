import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';
import { AcceptedEvaluationsComponent } from './accepted-evaluations/accepted-evaluations.component';
import { AcceptedEvaluationDetailComponent } from './accepted-evaluation-detail/accepted-evaluation-detail.component';

const routes: Routes = [
  { path: '', component: ExpertDashboardComponent },
  { path: 'evaluation/:id', component: EvaluationDetailComponent },
  { path: 'accepted', component: AcceptedEvaluationsComponent },
  { path: 'accepted/:id', component: AcceptedEvaluationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertRoutingModule { }