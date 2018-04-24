import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseDashboardComponent } from './component/nurse-dashboard/nurse-dashboard.component';
import { PatientsListComponent } from './component/patients-list/patients-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from '../shared/services/patient.service';
import { PatientComponent } from './component/patient/patient.component';
import { ExaminationsListComponent } from '../examination/components/examinations-list/examinations-list.component';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NurseRoutingModule
    ],
    declarations: [
        NurseDashboardComponent,
        PatientsListComponent,
        PatientComponent,
    ],
    providers: [
        PatientService,
    ]
})
export class NurseModule {
}
