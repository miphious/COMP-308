import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../shared/services/patient.service';
import { Patient } from '../../../shared/models/patient';
import { getErrorMessage } from '../../../shared/helpers/helpers';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html'
})
export class PatientsListComponent implements OnInit {
    patients: Patient[];
    error: string;

    constructor(
        private _authService: AuthService,
        private _patientService: PatientService
    ) {
    }

    ngOnInit() {
        this.loadAllPatients();
    }

    registerPatient(patientId: string) {
        this.error = null;
        const nurseId = this._authService.user.id;
        this._patientService
            .registerWithPatient(nurseId, patientId)
            .subscribe(
                () => {
                    const patient = this.patients
                        .filter(p => p.id === patientId)
                        [0];
                    if (!patient.nurses) {
                        patient.nurses = [];
                    }
                    patient.nurses.push(nurseId);
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }

    unregisterPatient(patientId: string) {
        this.error = null;
        const nurseId = this._authService.user.id;
        this._patientService
            .unregisterWithPatient(nurseId, patientId)
            .subscribe(
                () => {
                    const patient = this.patients
                        .filter(p => p.id === patientId)
                        [0];

                    patient.nurses = patient.nurses
                        .filter(id => id !== nurseId);
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }

    isPatientTaken(patient: Patient): boolean {
        if (!patient.nurses) {
            return false;
        } else {
            return patient.nurses.some(id => id === this._authService.user.id);
        }
    }

    private loadAllPatients() {
        this.error = null;
        this._patientService
            .getAll()
            .subscribe(
                patients => {
                    this.patients = patients;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }
}
