import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExaminationRoutingModule } from './examination-routing.module';
import { PatientExaminationComponent } from './components/patient-examination/patient-examination.component';
import { ExaminationsListComponent } from './components/examinations-list/examinations-list.component';
import { ExaminationService } from './services/examination.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ExaminationRoutingModule
    ],
    declarations: [
        PatientExaminationComponent,
        ExaminationsListComponent,
    ],
    providers: [
        ExaminationService,
    ]
})
export class ExaminationModule {
}
