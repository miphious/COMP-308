import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EmergencyAlert } from '../models/emergency-alert';

@Injectable()
export class EmergencyAlertService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getAll() {
        return this._http
            .get<EmergencyAlert[]>('/api/clinic/emergency-alert');
    }

    send() {
        return this._http
            .post<EmergencyAlert>('/api/clinic/emergency-alert', null);
    }
}
