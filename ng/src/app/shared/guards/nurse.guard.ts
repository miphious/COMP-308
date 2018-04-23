import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad, Route, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ErrorService } from '../services/error.service';

@Injectable()
export class NurseGuard implements CanActivate, CanLoad {
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _errorService: ErrorService
    ) {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this._authService.user.role === 'nurse') {
            return true;
        } else {
            this._errorService.errors.push(`Not authorized to access "${state.url}"`);
            this._router.navigate(['error']);
        }
    }

    canLoad(route: Route): boolean {
        if (!this._authService.user) {
            this._router.navigate(['login'], {
                queryParams: {returnUrl: route.path}
            });
            return false;
        }

        if (this._authService.user.role !== 'nurse') {
            this._errorService.errors.push(`Not authorized to access "${route.path}"`);
            this._router.navigate(['error']);
            return false;
        }

        return true;
    }
}
