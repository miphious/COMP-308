import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './services/error.service';
import { AuthGuard } from './guards/auth.guard';
import { NurseGuard } from './guards/nurse.guard';
import { PatientGuard } from './guards/patient.guard';
import { PatientService } from './services/patient.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    declarations: [],
    providers: [
        AuthGuard,
        NurseGuard,
        PatientGuard,
        ErrorService,
        AuthService,
        PatientService,
    ]
})
export class SharedModule {
}
