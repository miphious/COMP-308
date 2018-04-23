import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../service/patient.service';
import { Patient } from '../../../shared/models/patient';
import { getErrorMessage } from '../../../shared/helpers/helpers';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user';

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

    getNursesValue(nurses: User[]): string {
        if (nurses && nurses.length) {
            let text = nurses.length as string;
            if (nurses.some(id => id === this._authService.user.id)) {
                text += ' (including you)';
            }
            return text;
        } else {
            return '-';
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
