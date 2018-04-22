import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {StudentService} from '../../services/student.service';
import {User} from '../../models/user';
import {getErrorMessage} from '../../helpers/helpers';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

    student: User;

    isSending: boolean;

    error?: string;

    constructor(
        private _studentsService: StudentService,
        private _authService: AuthService
    ) {
    }

    ngOnInit() {
        this.student = this._authService.user;
    }

    update(form: NgForm) {
        this.isSending = true;
        this.error = null;
        this._studentsService
            .updateStudent(this.student)
            .subscribe(
                student => {
                    form.reset(student);
                    this.isSending = false;
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }
}
