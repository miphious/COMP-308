import * as mongoose from 'mongoose';
import {UserModelName} from './user.model';

export const CourseModelName = 'course';

export interface ICourseModel extends mongoose.Document {
    code: string;
    name: string;
    section: string;
    students: mongoose.Schema.Types.ObjectId[];

    toDTO(): any;
}

export function registerModelCourse() {
    const CourseSchema = new mongoose.Schema({
        code: {
            type: String,
            required: 'Code is required',
        },
        name: {
            type: String,
            required: 'Name is required',
        },
        section: {
            type: String,
            required: 'Section number is required',
            validate: {
                validator: val => !isNaN(val) && val > 0,
                msg: 'Section number is invalid'
            }
        },
        students: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModelName
        }]
    });

    CourseSchema.index({
            code: 1,
            section: 1
        },
        {unique: true}
    );

    CourseSchema.pre('save', function (next) {
        const course: ICourseModel = this;
        course.section = Math.trunc(+course.section)
            .toLocaleString('en', {minimumIntegerDigits: 3});
        next();
    });

    CourseSchema.methods.toDTO = function () {
        const course: ICourseModel = this;

        const dto = course.toObject();

        dto.id = dto._id;
        delete dto._id;
        delete dto.__v;

        return dto;
    };

    mongoose.model(CourseModelName, CourseSchema);
}

export function getModelCourse() {
    return mongoose.model<ICourseModel>(CourseModelName);
}
