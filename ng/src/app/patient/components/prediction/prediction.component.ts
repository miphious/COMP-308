import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PredictionService } from '../../service/prediction.service';
import { getErrorMessage } from '../../../shared/helpers/helpers';

@Component({
    selector: 'app-prediction',
    templateUrl: './prediction.component.html'
})
export class PredictionComponent {
    predictionsForm: FormGroup;
    predictions: { name: string, value: string }[];
    error: string;
    isSending = false;

    constructor(
        private _predictionService: PredictionService,
        private _formBuilder: FormBuilder
    ) {
        this.buildForm();
    }

    submitBiometrics() {
        this.isSending = true;
        this.error = null;

        this._predictionService
            .getPredictions(this.getModel())
            .subscribe(
                predictions => {
                    this.isSending = false;
                    this.predictions = buildPredictions(predictions);
                    this.buildForm();
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    private getModel(): Object {
        const formModel = this.predictionsForm.value;
        const newModel = {};
        for (const fieldName in formModel) {
            if (!formModel.hasOwnProperty(fieldName)) {
                continue;
            }

            if ((formModel[fieldName] + '').length) {
                newModel[fieldName] = formModel[fieldName];
            }
        }
        return newModel;
    }

    private buildForm() {
        this.predictionsForm = this._formBuilder.group({
            fever: [''],
            diarrhea: [''],
            muscleAches: [''],
            coughing: [''],
            severeHeadache: [''],
            fatigue: [''],
            visionProblems: [''],
            chestPain: [''],
            difficultyBreathing: [''],
            irregularHeartbeat: [''],
            chestDiscomfort: [''],
            nausea: [''],
            indigestion: [''],
            stomachPain: [''],
            heartburn: [''],
            age: ['', Validators.required],
            days: ['', Validators.required],
        });
    }
}

function buildPredictions(rawPredictions): any[] {
    const predictions = [];
    for (const fieldName in rawPredictions) {
        if (!rawPredictions.hasOwnProperty(fieldName)) {
            continue;
        }

        predictions.push({
            name: fieldName,
            value: rawPredictions[fieldName]
        });
    }
    return predictions;
}
