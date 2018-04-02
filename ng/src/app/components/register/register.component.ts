import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Student} from '../../models/student';
import {FormValidators} from '../../helpers/form-validators';
import {getErrorMessage} from '../../helpers/helpers';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    studentForm: FormGroup;

    isSending: boolean;

    error?: string;

    constructor(
        private _authService: AuthService,
        private _router: Router,
        formBuilder: FormBuilder
    ) {
        this.studentForm = formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            passwords: formBuilder.group({
                password: ['', [Validators.required, Validators.minLength(6)]],
                passwordConfirm: ['', Validators.required]
            }, {validator: FormValidators.areEqual}),
            studentNumber: ['', [Validators.required, Validators.minLength(6)]],
            program: ['', [Validators.required, Validators.minLength(3)]],
            phone: ['', [Validators.required, Validators.minLength(3)]],
            address: ['', [Validators.required, Validators.minLength(6)]],
            city: ['', [Validators.required, Validators.minLength(2)]],
        });
    }

    registerStudent() {
        this.isSending = true;
        this._authService
            .registerStudent(this.getStudentModel())
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

    private getStudentModel(): Student {
        const newStudent: any = Object.assign({}, this.studentForm.value);
        newStudent.password = newStudent.passwords.password;
        delete newStudent.passwords;

        return newStudent;
    }
}
