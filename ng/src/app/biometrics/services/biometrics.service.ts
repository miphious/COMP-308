import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Biometrics } from '../models/biometrics';

@Injectable()
export class BiometricsService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getAllForPatient(patientId: string) {
        return this._http
            .get<Biometrics[]>(`/api/clinic/biometrics/${patientId}`);
    }
}
