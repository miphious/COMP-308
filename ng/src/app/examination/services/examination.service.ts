import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Examination } from '../models/examination';

@Injectable()
export class ExaminationService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getAllForPatient(patientId: string) {
        return this._http
            .get<Examination[]>(`/api/clinic/examinations/${patientId}`);
    }
}
