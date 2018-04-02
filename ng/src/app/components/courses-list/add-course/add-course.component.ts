import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CourseService} from '../../../services/course.service';
import {Course} from '../../../models/course';
import {getErrorMessage} from '../../../helpers/helpers';

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html'
})
export class AddCourseComponent {
    @Output() courseAdded = new EventEmitter<Course>();

    course: Course = new Course();

    error?: string;

    isSending = false;

    constructor(
        private _courseService: CourseService
    ) {
    }

    createCourse(form: NgForm) {
        this.isSending = true;
        this.error = null;

        this._courseService
            .addCourse(this.course)
            .subscribe(
                newCourse => {
                    this.isSending = false;
                    form.reset(new Course());
                    this.courseAdded.emit(newCourse);
                },
                e => {
                    this.error = getErrorMessage(e);
                    this.isSending = false;
                }
            );
    }
}
