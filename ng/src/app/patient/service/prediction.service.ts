import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PredictionService {
    constructor(
        private _http: HttpClient
    ) {
    }

    getPredictions(biometrics: Object) {
        return this._http
            .post<Object>('/api/clinic/predictions', biometrics);
    }
}
