import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './services/error.service';
import { AuthGuard } from './guards/auth.guard';
import { NurseGuard } from './guards/nurse.guard';
import { PatientGuard } from './guards/patient.guard';
import { PatientService } from './services/patient.service';
import { DailyTipService } from './services/daily-tip.service';
import { EmergencyAlertService } from './services/emergency-alert.service';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    providers: [
        AuthGuard,
        NurseGuard,
        PatientGuard,
        ErrorService,
        PatientService,
        DailyTipService,
        EmergencyAlertService,
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [AuthService]
        };
    }
}
