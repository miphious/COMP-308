import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Biometrics } from '../../models/biometrics';
import { getErrorMessage } from '../../../shared/helpers/helpers';
import { BiometricsService } from '../../services/biometrics.service';

@Component({
    selector: 'app-add-biometrics',
    templateUrl: './add-biometrics.component.html'
})
export class AddBiometricsComponent {
    @Input() patientId: string;
    @Output() biometricsPosted = new EventEmitter<Biometrics>();
    biometrics = new Biometrics();
    error?: string;
    isSending = false;

    constructor(
        private _biometricsService: BiometricsService
    ) {
    }

    submitBiometrics(form: NgForm) {
        this.isSending = true;
        this.error = null;

        this._biometricsService
            .add(this.getFormModel())
            .subscribe(
                newBiometrics => {
                    this.isSending = false;
                    form.reset(new Biometrics());
                    this.biometricsPosted.emit(newBiometrics);
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    private getFormModel(): Biometrics {
        const newModel = Object.assign({}, this.biometrics);
        newModel.patient = this.patientId;
        return newModel;
    }
}
