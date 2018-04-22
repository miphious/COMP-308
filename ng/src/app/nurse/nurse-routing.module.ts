import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NurseDashboardComponent } from './component/nurse-dashboard/nurse-dashboard.component';

const routes: Routes = [
    {path: '', component: NurseDashboardComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NurseRoutingModule {
}
