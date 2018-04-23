import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { getErrorMessage } from '../../../shared/helpers/helpers';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
    loginModel = {
        username: '',
        password: ''
    };
    isSending: boolean;
    error: string;
    private _returnUrl?: string;

    constructor(
        private _authService: AuthService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
    }

    ngOnInit() {
        this._route.queryParamMap
            .subscribe(
                p => {
                    this._returnUrl = p.get('returnUrl');
                    if (p.get('error')) {
                        this.error = 'Not Authorized!';
                    }
                }
            );
    }

    login() {
        this.isSending = true;
        this.error = null;
        this._authService
            .login(this.loginModel)
            .subscribe(
                () => {
                    this.navigateToDashboard();
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    private async navigateToDashboard() {
        this.isSending = true;
        this.error = null;

        let b: boolean;
        try {
            b = await this._router.navigate([this._returnUrl || '/home']);
        } catch (e) {
            this.error = getErrorMessage(e);
            this.isSending = false;
        }
    }
}
