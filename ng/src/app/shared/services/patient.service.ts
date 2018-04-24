import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';

@Injectable()
export class PatientService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getAll() {
        return this._http
            .get<Patient[]>('/api/patients');
    }

    getById(patientId: string) {
        return this._http
            .get<Patient>(`/api/patients/${patientId}`);
    }

    registerWithPatient(nurseId: string, patientId: string) {
        return this._http
            .post<void>('/api/clinic/register', {
                nurse: nurseId, patient: patientId
            });
    }

    unregisterWithPatient(nurseId: string, patientId: string) {
        // ToDo
        return this._http
            .delete<void>(`/api/clinic/register?nurse=${nurseId}&patient=${patientId}`);
    }
}
