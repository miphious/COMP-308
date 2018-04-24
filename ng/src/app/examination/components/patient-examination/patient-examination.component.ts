import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../../shared/services/patient.service';
import { getErrorMessage } from '../../../shared/helpers/helpers';
import { Patient } from '../../../shared/models/patient';
import { ExaminationService } from '../../services/examination.service';
import { Examination } from '../../models/examination';

@Component({
    selector: 'app-patient-examination',
    templateUrl: './patient-examination.component.html'
})
export class PatientExaminationComponent implements OnInit {
    patient: Patient;
    examinations: Examination[];
    error: string;

    constructor(
        private _patientService: PatientService,
        private _examinationService: ExaminationService,
        private _route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this._route.paramMap
            .subscribe(p => {
                const patientId = p.get('patientId');
                this.loadPatient(patientId);
                this.loadExaminations(patientId);
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

    loadExaminations(patientId: string) {
        this._examinationService
            .getAllForPatient(patientId)
            .subscribe(
                examinations => {
                    this.examinations = examinations;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }

    addNewExamination(examination: Examination) {
        this.examinations.push(examination);
    }
}
