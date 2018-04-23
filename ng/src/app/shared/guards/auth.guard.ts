import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private _authService: AuthService,
        private _router: Router
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._authService.user) {
            return true;
        } else {
            this._router
                .navigate(['login'], {
                    queryParams: {returnUrl: state.url}
                });
        }
    }
}
