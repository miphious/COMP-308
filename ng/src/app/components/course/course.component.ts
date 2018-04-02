import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {CourseService} from '../../services/course.service';
import {StudentService} from '../../services/student.service';
import {Student} from '../../models/student';
import {Course} from '../../models/course';
import {getErrorMessage} from '../../helpers/helpers';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html'
})
export class CourseComponent implements OnInit {

    course: Course;

    enrolledStudents: Student[];

    addDropData: {
        title: string,
        icon: string,
        css: string,
        isTakingCourse: boolean
    };

    isSending: boolean;

    error?: string;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _courseService: CourseService,
        private _studentService: StudentService,
        private _authService: AuthService
    ) {
    }

    ngOnInit() {
        this.error = null;
        this.course = null;

        this._activatedRoute.paramMap
            .subscribe(p => {
                this.getCourse(p.get('courseId'));
            });
    }

    updateCourse(form: NgForm) {
        this.isSending = true;
        this.error = null;

        this._courseService
            .updateCourse(this.course)
            .subscribe(
                course => {
                    this.isSending = false;
                    form.reset(course);
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }

    addDropCourse() {
        const currentStudentId = this._authService.user.id;

        const observable = this.addDropData.isTakingCourse
            ? this._studentService.dropCourse(currentStudentId, this.course.id)
            : this._studentService.takeCourse(currentStudentId, this.course.id);

        observable.subscribe(
            () => {
                this.isSending = true;
                this.getCourse(this.course.id);
            },
            e => {
                this.error = getErrorMessage(e);
            }
        );
    }

    deleteCourse() {
        this.isSending = true;

        this._courseService
            .deleteCourse(this.course.id)
            .subscribe(
                () => {
                    this._router.navigate(['/courses']);
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }

    private getCourse(id: string) {
        this._courseService
            .getCourseById(id)
            .subscribe(
                c => {
                    this.course = c;
                    this.updateAddDropInfo();
                    this.isSending = false;
                    this.getEnrolledStudents();
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }

    private getEnrolledStudents() {
        this._courseService
            .getAllEnrolledStudents(this.course.id)
            .subscribe(
                students => {
                    this.enrolledStudents = students;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }

    private updateAddDropInfo() {
        const currentStudentId = this._authService.user.id;
        if (this.course.students.some(s => s === currentStudentId)) {
            this.addDropData = {
                isTakingCourse: true,
                title: 'Drop',
                css: 'btn btn-warning',
                icon: 'fa fa-minus-square',
            };
        } else {
            this.addDropData = {
                isTakingCourse: false,
                title: 'Take',
                css: 'btn btn-success',
                icon: 'fa fa-plus-square'
            };
        }
    }
}
