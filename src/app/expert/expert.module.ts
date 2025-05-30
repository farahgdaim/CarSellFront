import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertRoutingModule } from './expert-routing.module';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';
import { FormsModule } from '@angular/forms';
import { AcceptedEvaluationsComponent } from './accepted-evaluations/accepted-evaluations.component';
import { AcceptedEvaluationDetailComponent } from './accepted-evaluation-detail/accepted-evaluation-detail.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    ExpertDashboardComponent,
    EvaluationDetailComponent,
    AcceptedEvaluationsComponent,
    AcceptedEvaluationDetailComponent,
    HomeComponent
    // Declare additional expert components here if needed.
  ],
  imports: [
    CommonModule,
    ExpertRoutingModule,
    FormsModule
  ]
})
export class ExpertModule { }
