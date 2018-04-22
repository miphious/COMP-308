import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { PatientDashboardComponent } from './components/patient-dashboard/patient-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        PatientRoutingModule
    ],
    declarations: [PatientDashboardComponent]
})
export class PatientModule {
}
