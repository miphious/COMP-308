import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../shared/models/patient';
import { PatientService } from '../../../shared/services/patient.service';
import { getErrorMessage } from '../../../shared/helpers/helpers';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-patient-dashboard',
    templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent implements OnInit {
    patient: Patient;
    error: string;

    constructor(
        private _patientService: PatientService,
        private _authService: AuthService
    ) {
    }

    ngOnInit() {
        this.loadPatient(this._authService.user.id);
    }

    loadPatient(patientId: string) {
        this._patientService
            .getById(patientId)
            .subscribe(
                patient => {
                    this.patient = patient;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }
}
