import {Component, Input, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Course} from '../../models/course';
import {getErrorMessage} from '../../helpers/helpers';

@Component({
    selector: 'app-courses-list',
    templateUrl: './courses-list.component.html'
})
export class CoursesListComponent implements OnInit {
    @Input() courses: Course[];

    allowAdd: boolean;

    error?: string;

    constructor(private _courseService: CourseService) {
    }

    ngOnInit() {
        if (!this.courses) {
            this.allowAdd = true;
            this.getAllCourses();
        }
    }

    onCourseAdded(course: Course) {
        this.courses.push(course);
    }

    private getAllCourses() {
        this._courseService
            .getAllCourses()
            .subscribe(
                courses => {
                    this.courses = courses;
                },
                e => {
                    this.error = getErrorMessage(e);
                }
            );
    }
}
