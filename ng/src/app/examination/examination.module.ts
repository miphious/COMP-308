import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminationRoutingModule } from './examination-routing.module';
import { PatientExaminationComponent } from './components/patient-examination/patient-examination.component';
import { ExaminationsListComponent } from './components/examinations-list/examinations-list.component';
import { ExaminationService } from './services/examination.service';
import { SharedModule } from '../shared/shared.module';
import { AddExaminationComponent } from './components/add-examination/add-examination.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ExaminationRoutingModule
    ],
    declarations: [
        PatientExaminationComponent,
        ExaminationsListComponent,
        AddExaminationComponent,
    ],
    providers: [
        ExaminationService,
    ]
})
export class ExaminationModule {
}
