import { Component, Input } from '@angular/core';
import { getErrorMessage } from '../../../shared/helpers/helpers';
import { NgForm } from '@angular/forms';
import { DailyTip } from '../../../shared/models/daily-tip';
import { DailyTipService } from '../../../shared/services/daily-tip.service';

@Component({
    selector: 'app-add-daily-tip',
    templateUrl: './add-daily-tip.component.html'
})
export class AddDailyTipComponent {
    @Input() patientId: string;
    dailyTip = new DailyTip();
    error?: string;
    isSending = false;

    constructor(
        private _dailyTipService: DailyTipService
    ) {
    }

    submitDailyTip(form: NgForm) {
        this.isSending = true;
        this.error = null;

        this._dailyTipService
            .add(this.getFormModel())
            .subscribe(
                () => {
                    this.isSending = false;
                    form.reset(new DailyTip());
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    private getFormModel(): DailyTip {
        const newModel = Object.assign({}, this.dailyTip);
        newModel.patient = this.patientId;
        return newModel;
    }
}
