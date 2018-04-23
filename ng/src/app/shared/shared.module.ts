import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorService } from './services/error.service';
import { AuthGuard } from './guards/auth.guard';
import { NurseGuard } from './guards/nurse.guard';
import { PatientGuard } from './guards/patient.guard';

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
        StudentService,
    ]
})
export class SharedModule {
}
