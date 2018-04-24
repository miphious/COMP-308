import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Patient } from '../../../shared/models/patient';
import { PatientService } from '../../../shared/services/patient.service';
import { getErrorMessage } from '../../../shared/helpers/helpers';

@Component({
    selector: 'app-patient',
    templateUrl: './patient.component.html'
})
export class PatientComponent implements OnInit {
    patient: Patient;
    error: string;

    constructor(
        private _patientService: PatientService,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._route.paramMap
            .subscribe(p => {
                this.loadPatient(p.get('patientId'));
            });
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
