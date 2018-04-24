import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/do';
import { User } from '../models/user';
import { EventEmitter } from 'events';

@Injectable()
export class AuthService {

    get user(): User {
        return this._currentUser;
    }

    private _currentUser: User;

    private _authEventEmitter = new EventEmitter();

    constructor(private _http: HttpClient) {
    }

    observeUserLogin() {
        return fromEvent<User>(this._authEventEmitter, 'login');
    }

    observeUserLogout() {
        return fromEvent(this._authEventEmitter, 'logout');
    }

    registerUser(user: User) {
        return this._http
            .post<User>('/api/register', user);
    }

    login(login: { username: string, password: string }) {
        return this._http
            .post<User>('/api/login', login)
            .do<User>(student => {
                this._currentUser = student;
                this._authEventEmitter.emit('login', student);
            });
    }

    logout() {
        return this._http
            .post('/api/logout', null)
            .do(() => {
                this._authEventEmitter.emit('logout');
                this._currentUser = null;
            });
    }
}
