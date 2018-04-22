import {FormGroup} from '@angular/forms';
import {ValidationErrors} from '@angular/forms/src/directives/validators';

export class FormValidators {

    static areEqual(group: FormGroup): ValidationErrors | null {
        let isValid = true;
        const values = [];

        // noinspection TsLint
        for (const controlName in group.controls) {
            const newValue = group.controls[controlName].value;

            if (values.some(v => v !== newValue)) {
                isValid = false;
                break;
            }

            values.push(newValue);
        }

        if (isValid) {
            return null;
        }
        return {
            areEqual: true
        };
    }

}
