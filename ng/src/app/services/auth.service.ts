import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {fromEvent} from 'rxjs/observable/fromEvent';
import 'rxjs/add/operator/do';
import {Student} from '../models/student';
import {EventEmitter} from 'events';

@Injectable()
export class AuthService {

    get user(): Student {
        return this._currentUser;
    }

    private _currentUser: Student;

    private _authEventEmitter = new EventEmitter();

    constructor(private _http: HttpClient) {
    }

    observeUserLogin() {
        return fromEvent<Student>(this._authEventEmitter, 'login');
    }

    observeUserLogout() {
        return fromEvent(this._authEventEmitter, 'logout');
    }

    registerStudent(student: Student) {
        return this._http
            .post<Student>('/api/register', student);
    }

    login(login: { username: string, password: string }) {
        return this._http
            .post<Student>('/api/login', login)
            .do(student => {
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
