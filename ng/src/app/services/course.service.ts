import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Course} from '../models/course';

@Injectable()
export class CourseService {
    constructor(private _http: HttpClient) {
    }

    addCourse(course: Course) {
        return this._http
            .post<Course>('/api/courses', course);
    }

    getCourseById(id: string) {
        return this._http
            .get<Course>(`/api/courses/${id}`);
    }

    getAllCourses() {
        return this._http
            .get<Course[]>('/api/courses');
    }

    getAllEnrolledStudents(courseId: string) {
        return this._http
            .get<User[]>(`/api/courses/${courseId}/students`);
    }

    updateCourse(course: Course) {
        return this._http
            .patch<Course>(`/api/courses/${course.id}`, course);
    }

    deleteCourse(courseId: string) {
        return this._http
            .delete(`/api/courses/${courseId}`);
    }
}
