import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { FormValidators } from '../../helpers/form-validators';
import { getErrorMessage } from '../../helpers/helpers';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    registrationForm: FormGroup;

    isSending: boolean;

    error?: string;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        formBuilder: FormBuilder
    ) {
        this.registrationForm = formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            passwords: formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                passwordConfirm: ['', Validators.required]
            }, {validator: FormValidators.areEqual}),
            role: ['', [Validators.required]],
            address: ['', [Validators.required, Validators.minLength(6)]],
        });
    }

    registerUser() {
        this.isSending = true;
        this._authService
            .registerUser(this.getModel())
            .subscribe(
                () => {
                    this._router.navigate(['/login']);
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    private getModel(): User {
        const newModel: any = Object.assign({}, this.registrationForm.value);
        newModel.password = newModel.passwords.password;
        delete newModel.passwords;

        return newModel;
    }
}
