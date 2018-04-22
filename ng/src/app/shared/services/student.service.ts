import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Course} from '../models/course';
import {RequestOptions} from '@angular/http';

@Injectable()
export class StudentService {

    constructor(private _http: HttpClient) {
    }

    getStudentById(id: string) {
        return this._http
            .get<User>(`/api/students/${id}`);
    }

    getAllStudents() {
        return this._http
            .get<User[]>(`/api/students`);
    }

    getAllTakenCourses(studentId: string) {
        return this._http
            .get<Course[]>(`/api/students/${studentId}/courses`);
    }

    updateStudent(student: User) {
        return this._http
            .patch<User>(`/api/students/${student.id}`, student);
    }

    takeCourse(studentId: string, courseId: string) {
        return this._http
            .post(`/api/registrations`, {
                student: studentId,
                course: courseId
            });
    }

    dropCourse(studentId: string, courseId: string) {
        return this._http
            .delete(`/api/registrations`, <any>new RequestOptions({
                body: {
                    student: studentId,
                    course: courseId
                }
            }));
    }
}
