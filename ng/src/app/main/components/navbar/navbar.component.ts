import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { User } from '../../../shared/models/user';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
    user: User;
    profileLink: string[];

    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    ngOnInit() {
        this._authService
            .observeUserLogin()
            .subscribe(
                student => {
                    this.profileLink = [`/students/view/${student.id}`];
                    this.user = student;
                }
            );

        this._authService
            .observeUserLogout()
            .subscribe(
                () => {
                    this.user = null;
                    this.profileLink = null;
                }
            );
    }

    logout() {
        this._authService
            .logout()
            .subscribe(
                () => {
                    this._router.navigate(['']);
                },
                e => {
                    console.error('Failed to logout');
                }
            );
    }
}
