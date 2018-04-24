import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientExaminationComponent } from './components/patient-examination/patient-examination.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {path: ':patientId', component: PatientExaminationComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class ExaminationRoutingModule {
}
