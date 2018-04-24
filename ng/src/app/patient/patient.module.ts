import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';
import { PredictionComponent } from './components/prediction/prediction.component';
import { SharedModule } from '../shared/shared.module';
import { PredictionService } from './service/prediction.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        PatientRoutingModule
    ],
    declarations: [PatientDashboardComponent, PredictionComponent],
    providers: [PredictionService]
})
export class PatientModule {
}
