import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientBiometricsComponent } from './components/patient-biometrics/patient-biometrics.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
    {path: ':patientId', component: PatientBiometricsComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class BiometricsRoutingModule {
}
