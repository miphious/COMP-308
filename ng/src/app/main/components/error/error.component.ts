import { Component, OnDestroy, OnInit } from '@angular/core';
import { ErrorService } from '../../../shared/services/error.service';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html'
})
export class ErrorComponent implements OnInit, OnDestroy {
    errors: string[];

    constructor(
        private _errorService: ErrorService
    ) {
    }

    ngOnInit() {
        this.errors = this._errorService.errors;
    }

    ngOnDestroy() {
        this._errorService.errors = [];
    }
}
