import { Request, Response, NextFunction } from 'express';
import { IUserModel, getModelUser } from '../models/user.model';
import { getModelCourse, ICourseModel } from '../models/course.model';
import { ApiError } from '../models/api-error';

export class ClinicController {

    public static async registerPatient(req: Request, res: Response, next: NextFunction) {
        const patientId: string = req.body.patient;
        const nurseId: string = req.body.nurse;

        const User = getModelUser();

        let patient: IUserModel;
        let nurse: IUserModel;

        try {
            patient = await User.findOne({ _id: patientId, role: 'patient' });
        } catch (e) {
            return next(e);
        }
        if (!patient) {
            res.status(404);
            res.send(new ApiError('Patient not found'));
            return;
        }

        try {
            nurse = await User.findOne({ _id: nurseId, role: 'nurse' });
        } catch (e) {
            return next(e);
        }
        if (!nurse) {
            res.status(404);
            res.send(new ApiError('Nurse not found'));
            return;
        }

        try {
            await patient.update({ $addToSet: { associatedUsers: nurseId } });
            await nurse.update({ $addToSet: { associatedUsers: patientId } });
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        res.send();
    }

    public static async unregisterPatient(req: Request, res: Response, next: NextFunction) {
        // ToDo
        /*
        const studentId: string = req.body.student;
        const courseId: string = req.body.course;

        const Student = getModelUser();
        const Course = getModelCourse();

        let student: IUserModel;
        let course: ICourseModel;

        try {
            student = await Student.findById(studentId);
        } catch (e) {
            return next(e);
        }
        if (!student) {
            res.status(404);
            res.send(new ApiError('User not found'));
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
            await student.update({ $pull: { courses: courseId } });
            await course.update({ $pull: { students: studentId } });
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        res.send();
        */
    }
}
