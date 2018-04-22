import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {StudentService} from '../../services/student.service';
import {User} from '../../models/user';
import {Course} from '../../models/course';
import {getErrorMessage} from '../../helpers/helpers';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html'
})
export class StudentComponent implements OnInit {

    student: User;

    takenCourses: Course[];

    error?: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _studentService: StudentService
    ) {
    }

    ngOnInit() {
        this.error = null;
        this.student = null;

        this._activatedRoute.paramMap
            .subscribe(p => {
                this.getStudentById(p.get('studentId'));
            });
    }

    private getStudentById(id: string) {
        this._studentService
            .getStudentById(id)
            .subscribe(
                s => {
                    this.student = s;
                    this.getStudentCourses();
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }

    private getStudentCourses() {
        this._studentService
            .getAllTakenCourses(this.student.id)
            .subscribe(
                courses => {
                    this.takenCourses = courses;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }
}
