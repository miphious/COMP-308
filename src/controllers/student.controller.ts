import {Request, Response, NextFunction} from 'express';
import {IUserModel, getModelUser} from '../models/user.model';
import {ICourseModel, getModelCourse} from '../models/course.model';
import {ApiError} from '../models/api-error';

export class StudentController {

    public static async getAll(req: Request, res: Response, next: NextFunction) {
        const Student = getModelUser();
        let students: IUserModel[];

        try {
            students = await Student.find({}, {
                salt: 0,
                password: 0,
                __v: 0
            });
        } catch (e) {
            return next(e);
        }

        res.json(students.map(s => s.toDTO()));
    }

    public static async getById(req: Request, res: Response, next: NextFunction) {
        const studentId: string = req.params.studentId;
        const Student = getModelUser();
        let student;

        try {
            student = await Student.findById(studentId, {
                __v: 0,
                password: 0,
                salt: 0
            });
        } catch (e) {
            return next(e);
        }

        if (!student) {
            res.status(404);
            res.send(new ApiError('User not found'));
            return;
        }

        res.json(student.toDTO());
    }

    public static async getRegisteredCourses(req: Request, res: Response, next: NextFunction) {
        const studentId: string = req.params.studentId;

        const Student = getModelUser();
        let student: IUserModel;

        try {
            student = await Student.findById(studentId, {
                _id: 0,
                courses: 1
            });
        } catch (e) {
            return next(e);
        }

        if (!student) {
            res.status(404);
            res.send(new ApiError('User not found'));
            return;
        }

        const coursesTaken: ICourseModel[] = [];
        const Course = getModelCourse();

        for (const courseId of student.courses) {
            try {
                const course = await Course.findById(courseId,
                    {
                        __v: 0,
                        students: 0
                    });

                coursesTaken.push(course);
            } catch (e) {
                return next(e);
            }
        }

        res.json(coursesTaken.map(c => c.toDTO()));
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        const studentId: string = req.params.studentId;
        const Student = getModelUser();

        const allowedFieldsForUpdate = [
            'firstName', 'lastName', 'email', 'studentNumber', 'address', 'city', 'phone', 'program'
        ];
        const updateObj = {};
        let hasUpdateValues = false;
        for (const fieldName of allowedFieldsForUpdate) {
            if (req.body.hasOwnProperty(fieldName)) {

                if (!req.body[fieldName]) {
                    res.statusCode = 400;
                    res.send(new ApiError(`Invalid value for ${fieldName}`));
                    return;
                }

                updateObj[fieldName] = req.body[fieldName];
                hasUpdateValues = true;
            }
        }

        if (!hasUpdateValues) {
            res.statusCode = 400;
            res.send(new ApiError('Nothing updated'));
            return;
        }

        let student: IUserModel;
        try {
            student = await Student.findOneAndUpdate(
                {_id: studentId},
                updateObj,
                {
                    fields: {
                        password: 0,
                        salt: 0,
                        __v: 0
                    },
                    new: true,
                }
            );
        } catch (e) {
            return next(e);
        }

        res.json(student.toDTO());
    }
}
