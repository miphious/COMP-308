import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiometricsRoutingModule } from './biometrics-routing.module';
import { PatientBiometricsComponent } from './components/patient-biometrics/patient-biometrics.component';
import { BiometricsListComponent } from './components/biometrics-list/biometrics-list.component';
import { BiometricsService } from './services/biometrics.service';
import { SharedModule } from '../shared/shared.module';
import { AddBiometricsComponent } from './components/add-biometrics/add-biometrics.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        BiometricsRoutingModule
    ],
    declarations: [
        PatientBiometricsComponent,
        BiometricsListComponent,
        AddBiometricsComponent,
    ],
    providers: [
        BiometricsService,
    ]
})
export class BiometricsModule {
}
