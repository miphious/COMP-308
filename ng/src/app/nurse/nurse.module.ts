import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { PatientsListComponent } from './component/patients-list/patients-list.component';
import { HttpClientModule } from '@angular/common/http';
import { PatientService } from '../shared/services/patient.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        NurseRoutingModule
    ],
    declarations: [
        PatientsListComponent,
    ],
    providers: [
        PatientService,
    ]
})
export class NurseModule {
}
