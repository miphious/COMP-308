import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NurseRoutingModule } from './nurse-routing.module';
import { NurseDashboardComponent } from './component/nurse-dashboard/nurse-dashboard.component';

@NgModule({
    imports: [
        CommonModule,
        NurseRoutingModule
    ],
    declarations: [
        NurseDashboardComponent,
    ]
})
export class NurseModule {
}
