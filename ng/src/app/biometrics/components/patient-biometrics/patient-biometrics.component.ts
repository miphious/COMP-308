import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../shared/services/patient.service';
import { getErrorMessage } from '../../../shared/helpers/helpers';
import { Patient } from '../../../shared/models/patient';
import { BiometricsService } from '../../services/biometrics.service';
import { Biometrics } from '../../models/biometrics';

@Component({
    selector: 'app-patient-biometrics',
    templateUrl: './patient-biometrics.component.html'
})
export class PatientBiometricsComponent implements OnInit {
    patient: Patient;
    biometricsList: Biometrics[];
    error: string;

    constructor(
        private _patientService: PatientService,
        private _biometricsService: BiometricsService,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._route.paramMap
            .subscribe(p => {
                const patientId = p.get('patientId');
                this.loadPatient(patientId);
                this.loadBiometrics(patientId);
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

    loadBiometrics(patientId: string) {
        this._biometricsService
            .getAllForPatient(patientId)
            .subscribe(
                bmList => {
                    this.biometricsList = bmList;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }

    addNewBiometrics(biometrics: Biometrics) {
        this.biometricsList.push(biometrics);
    }
}
