import {NextFunction, Request, Response} from 'express';
import {getModelCourse, ICourseModel} from '../models/course.model';
import {IUserModel, getModelUser} from '../models/user.model';
import {ApiError} from '../models/api-error';

export class CourseController {

    public static async getAll(req: Request, res: Response, next: NextFunction) {
        const Course = getModelCourse();
        let courses: ICourseModel[];

        try {
            courses = await Course.find({}, {
                __v: 0
            });
        } catch (e) {
            return next(e);
        }

        res.json(courses.map(c => c.toDTO()));
    }

    public static async create(req: Request, res: Response, next: NextFunction) {
        const Course = getModelCourse();
        const course = new Course(req.body);

        try {
            await course.save();
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        res.json(course.toDTO());
    }

    public static async getById(req: Request, res: Response, next: NextFunction) {
        const courseId: string = req.params.courseId;
        const Course = getModelCourse();
        let course;

        try {
            course = await Course.findById(courseId, {
                __v: 0,
            });
        } catch (e) {
            return next(e);
        }

        if (!course) {
            res.status(404);
            res.send(new ApiError('Course not found'));
            return;
        }

        res.json(course.toDTO());
    }

    public static async update(req: Request, res: Response, next: NextFunction) {
        const courseId: string = req.params.courseId;
        const Course = getModelCourse();

        const updateObj = {};
        let hasUpdateValues = false;
        for (const fieldName of ['code', 'name', 'section']) {
            if (req.body.hasOwnProperty(fieldName)) {
                updateObj[fieldName] = req.body[fieldName];
                hasUpdateValues = true;
            }
        }

        if (!hasUpdateValues) {
            res.status(400);
            res.send(new ApiError('Nothing updated'));
            return;
        }

        if (updateObj['section']) {
            updateObj['section'] = Math.trunc(+updateObj['section'])
                .toLocaleString('en', {minimumIntegerDigits: 3});
        }


        let course: ICourseModel;
        try {
            course = await Course.findByIdAndUpdate(
                courseId,
                updateObj,
                {
                    select: {__v: 0},
                    new: true,
                    runValidators: true
                }
            );
        } catch (e) {
            return next(e);
        }

        res.json(course.toDTO());
    }

    public static async delete(req: Request, res: Response, next: NextFunction) {
        const courseId: string = req.params.courseId;
        const Course = getModelCourse();

        let course: ICourseModel;
        try {
            course = await Course.findOneAndRemove({_id: courseId});
        } catch (e) {
            return next(e);
        }

        if (!course) {
            res.status(404);
            res.send(new ApiError('Course not found'));
            return;
        }

        const Student = getModelUser();
        for (const studentId of course.students) {
            try {
                await Student.findOneAndUpdate(
                    {_id: studentId},
                    {$pull: {courses: courseId}}
                );
            } catch (e) {
                return next(e);
            }
        }

        res.statusCode = 204;
        res.send();
    }

    public static async getStudentsInCourse(req: Request, res: Response, next: NextFunction) {
        const courseId: string = req.params.courseId;

        const Course = getModelCourse();
        let course: ICourseModel;

        try {
            course = await Course.findById(courseId, {
                _id: 0,
                students: 1
            });
        } catch (e) {
            return next(e);
        }

        if (!course) {
            res.status(404);
            res.send(new ApiError('Course not found'));
            return;
        }

        const studentsInCourse: IUserModel[] = [];
        const Student = getModelUser();

        for (const studentId of course.students) {
            try {
                const student = await Student.findById(studentId);
                studentsInCourse.push(student);
            } catch (e) {
                return next(e);
            }
        }

        res.json(studentsInCourse.map(s => s.toDTO()));
    }
}
