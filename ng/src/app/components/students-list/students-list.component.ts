import {Component, Input, OnInit} from '@angular/core';
import {Student} from '../../models/student';
import {StudentService} from '../../services/student.service';
import {getErrorMessage} from '../../helpers/helpers';

@Component({
    selector: 'app-students-list',
    templateUrl: './students-list.component.html'
})
export class StudentsListComponent implements OnInit {
    @Input() students: Student[];

    error?: string;

    constructor(private _studentService: StudentService) {
    }

    ngOnInit() {
        if (!this.students) {
            this.getAllStudents();
        }
    }

    private getAllStudents() {
        this._studentService
            .getAllStudents()
            .subscribe(
                students => {
                    this.students = students;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }
}
