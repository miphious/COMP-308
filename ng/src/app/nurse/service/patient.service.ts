import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../../shared/models/patient';

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
}
