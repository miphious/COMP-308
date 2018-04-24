import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiometricsRoutingModule } from './biometrics-routing.module';
import { PatientBiometricsComponent } from './components/patient-biometrics/patient-biometrics.component';
import { BiometricsListComponent } from './components/biometrics-list/biometrics-list.component';
import { BiometricsService } from './services/biometrics.service';
import { AddBiometricsComponent } from './components/add-biometrics/add-biometrics.component';
import { FormsModule } from '@angular/forms';
import { AddDailyTipComponent } from './components/add-daily-tip/add-daily-tip.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BiometricsRoutingModule
    ],
    declarations: [
        PatientBiometricsComponent,
        BiometricsListComponent,
        AddBiometricsComponent,
        AddDailyTipComponent,
    ],
    providers: [
        BiometricsService,
    ]
})
export class BiometricsModule {
}
