import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NurseDashboardComponent } from './component/nurse-dashboard/nurse-dashboard.component';
import { AllPatientsComponent } from './component/all-patients/all-patients.component';

const routes: Routes = [
    {path: '', component: NurseDashboardComponent},
    {path: 'all-patients', component: AllPatientsComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NurseRoutingModule {
}
