import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseDashboardComponent } from './component/nurse-dashboard/nurse-dashboard.component';
import { PatientsListComponent } from './component/patients-list/patients-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from './service/patient.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NurseRoutingModule
    ],
    declarations: [
        NurseDashboardComponent,
        PatientsListComponent,
    ],
    providers: [
        PatientService,
    ]
})
export class NurseModule {
}
