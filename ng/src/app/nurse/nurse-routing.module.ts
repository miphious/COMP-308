import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsListComponent } from './component/patients-list/patients-list.component';

const routes: Routes = [
    {path: 'patients', component: PatientsListComponent},
    {path: '', redirectTo: 'patients', pathMatch: 'full'},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NurseRoutingModule {
}
