import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '../models/patient';
import { DailyTip } from '../models/daily-tip';

@Injectable()
export class DailyTipService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getAllForPatient(patientId: string) {
        return this._http
            .get<DailyTip[]>(`/api/clinic/daily-tips/${patientId}`);
    }

    add(tip: DailyTip) {
        return this._http
            .post<DailyTip>('/api/clinic/daily-tips', tip);
    }
}
