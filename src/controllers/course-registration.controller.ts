import {Request, Response, NextFunction} from 'express';
import {IStudentModel, getModelStudent} from '../models/student.model';
import {getModelCourse, ICourseModel} from '../models/course.model';
import {ApiError} from '../models/api-error';

export class CourseRegistrationController {

    public static async takeCourse(req: Request, res: Response, next: NextFunction) {
        const studentId: string = req.body.student;
        const courseId: string = req.body.course;

        const Student = getModelStudent();
        const Course = getModelCourse();

        let student: IStudentModel;
        let course: ICourseModel;

        try {
            student = await Student.findById(studentId);
        } catch (e) {
            return next(e);
        }
        if (!student) {
            res.status(404);
            res.send(new ApiError('Student not found'));
            return;
        }

        try {
            course = await Course.findById(courseId);
        } catch (e) {
            return next(e);
        }
        if (!course) {
            res.status(404);
            res.send(new ApiError('Course not found'));
            return;
        }

        try {
            await student.update({$addToSet: {courses: courseId}});
            await course.update({$addToSet: {students: studentId}});
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        res.send();
    }

    public static async dropCourse(req: Request, res: Response, next: NextFunction) {
        const studentId: string = req.body.student;
        const courseId: string = req.body.course;

        const Student = getModelStudent();
        const Course = getModelCourse();

        let student: IStudentModel;
        let course: ICourseModel;

        try {
            student = await Student.findById(studentId);
        } catch (e) {
            return next(e);
        }
        if (!student) {
            res.status(404);
            res.send(new ApiError('Student not found'));
            return;
        }

        try {
            course = await Course.findById(courseId);
        } catch (e) {
            return next(e);
        }
        if (!course) {
            res.status(404);
            res.send(new ApiError('Course not found'));
            return;
        }

        if (
            student.courses.every(crsId => crsId.toString() !== courseId) ||
            course.students.every(stdId => stdId.toString() !== studentId)
        ) {
            res.status(404);
            res.send(new ApiError('No such registration exists'));
            return;
        }

        try {
            await student.update({$pull: {courses: courseId}});
            await course.update({$pull: {students: studentId}});
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        res.send();
    }
}
