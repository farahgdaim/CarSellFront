import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpertRoutingModule } from './expert-routing.module';
import { ExpertDashboardComponent } from './expert-dashboard/expert-dashboard.component';
import { EvaluationDetailComponent } from './evaluation-detail/evaluation-detail.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ExpertDashboardComponent,
    EvaluationDetailComponent
    // Declare additional expert components here if needed.
  ],
  imports: [
    CommonModule,
    ExpertRoutingModule,
    FormsModule
  ]
})
export class ExpertModule { }
