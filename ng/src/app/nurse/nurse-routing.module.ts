import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NurseDashboardComponent } from './component/nurse-dashboard/nurse-dashboard.component';
import { PatientsListComponent } from './component/patients-list/patients-list.component';
import { PatientComponent } from './component/patient/patient.component';

const routes: Routes = [
    {path: '', component: NurseDashboardComponent},
    {path: 'patients-list', component: PatientsListComponent},
    {path: 'patients/:patientId', component: PatientComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NurseRoutingModule {
}
