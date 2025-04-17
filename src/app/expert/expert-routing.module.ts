import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';

const routes: Routes = [
  { path: '', component: ExpertDashboardComponent },
  { path: 'evaluation/:id', component: EvaluationDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertRoutingModule { }
