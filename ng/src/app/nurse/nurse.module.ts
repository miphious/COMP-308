import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseDashboardComponent } from './component/nurse-dashboard/nurse-dashboard.component';
import { AllPatientsComponent } from './component/all-patients/all-patients.component';

@NgModule({
    imports: [
        CommonModule,
        NurseRoutingModule
    ],
    declarations: [
        NurseDashboardComponent,
        AllPatientsComponent,
    ]
})
export class NurseModule {
}
