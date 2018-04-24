import { Component, OnInit } from '@angular/core';
import { Patient } from '../../../shared/models/patient';
import { PatientService } from '../../../shared/services/patient.service';
import { getErrorMessage } from '../../../shared/helpers/helpers';
import { AuthService } from '../../../shared/services/auth.service';
import { DailyTipService } from '../../../shared/services/daily-tip.service';
import { DailyTip } from '../../../shared/models/daily-tip';

@Component({
    selector: 'app-patient-dashboard',
    templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent implements OnInit {
    patient: Patient;
    dailyTips: DailyTip[];
    error: string;

    constructor(
        private _patientService: PatientService,
        private _dailyTipService: DailyTipService,
        private _authService: AuthService
    ) {
    }

    ngOnInit() {
        const patientId = this._authService.user.id;
        this.loadPatient(patientId);
        this.loadDailyTips(patientId);
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

    loadDailyTips(patientId: string) {
        this._dailyTipService
            .getAllForPatient(patientId)
            .subscribe(
                tips => {
                    this.dailyTips = tips;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }
}
