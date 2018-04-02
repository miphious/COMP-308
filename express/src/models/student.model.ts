import * as mongoose from 'mongoose';
import * as crypto from 'crypto';
import {CourseModelName} from './course.model';

export const StudentModelName = 'student';

export interface IStudentModel extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    studentNumber: string;
    address: string;
    city: string;
    phone: string;
    program: string;
    password: string;
    salt: string;
    courses: mongoose.Schema.Types.ObjectId[];

    hashPassword(password: string): string;

    verifyPassword(password: string): boolean;

    toDTO(): any;
}

export function registerModelStudent() {
    const StudentSchema = new mongoose.Schema({
        firstName: {
            type: String,
            required: 'First name is required',
        },
        lastName: {
            type: String,
            required: 'Last name is required',
        },
        email: {
            type: String,
            match: [/.+@.+\..+/, 'Please fill a valid email address'],
            unique: true
        },
        studentNumber: {
            type: String,
            unique: true,
            required: 'Student number is required',
            trim: true
        },
        address: {
            type: String,
            required: 'Address is required',
        },
        city: {
            type: String,
            required: 'City is required',
        },
        phone: {
            type: String,
            required: 'Phone number is required',
        },
        program: {
            type: String,
            required: 'Program name is required',
        },
        password: {
            type: String,
            required: 'Password is required',
            validate: [
                password => password && password.length >= 6,
                'Password should be longer'
            ]
        },
        salt: String,
        courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: CourseModelName
        }]
    });

    StudentSchema.pre('save', function (next) {
        const user: IStudentModel = this;

        if (!user.isModified('password')) {
            return next();
        }

        user.salt = crypto.randomBytes(16).toString('base64');
        user.password = user.hashPassword(user.password);

        next();
    });

    StudentSchema.methods.hashPassword = function (password: string): string {
        const user: IStudentModel = this;
        return crypto
            .pbkdf2Sync(password, user.salt, 1000, 64, 'sha1')
            .toString('base64');
    };

    StudentSchema.methods.verifyPassword = function (password: string) {
        const user: IStudentModel = this;
        return user.password === user.hashPassword(password);
    };

    StudentSchema.methods.toDTO = function () {
        const student: IStudentModel = this;

        const dto = student.toObject();

        dto.id = dto._id;
        delete dto._id;
        delete dto.password;
        delete dto.salt;
        delete dto.__v;

        return dto;
    };

    mongoose.model(StudentModelName, StudentSchema);
}

export function getModelStudent() {
    return mongoose.model<IStudentModel>(StudentModelName);
}
