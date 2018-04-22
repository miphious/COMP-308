import { Request, Response, NextFunction } from 'express';
import { IUserModel, getModelUser } from '../models/user.model';
import { ApiError } from '../models/api-error';

export class NurseController {

    public static async getAll(req: Request, res: Response, next: NextFunction) {
        const User = getModelUser();
        let nurses: IUserModel[];

        try {
            nurses = await User.find(
                { role: 'nurse' },
                {
                    salt: 0,
                    password: 0,
                    __v: 0
                });
        } catch (e) {
            return next(e);
        }

        res.json(nurses.map(s => s.toDTO()));
    }

    public static async getById(req: Request, res: Response, next: NextFunction) {
        const nurseId: string = req.params.nurseId;
        const User = getModelUser();
        let nurse;

        try {
            nurse = await User.findById(
                { _id: nurseId, role: 'nurse' }
                , {
                    __v: 0,
                    password: 0,
                    salt: 0
                });
        } catch (e) {
            return next(e);
        }

        if (!nurse) {
            res.status(404);
            res.send(new ApiError('User not found'));
            return;
        }

        res.json(nurse.toDTO());
    }

    public static async getPatients(req: Request, res: Response, next: NextFunction) {
        const nurseId: string = req.params.nurseId;

        const User = getModelUser();
        let nurse: IUserModel;

        try {
            nurse = await User.findOne(
                { _id: nurseId, role: 'nurse' },
                {
                    _id: 0,
                    associatedUsers: 1
                });
        } catch (e) {
            return next(e);
        }

        if (!nurse) {
            res.status(404);
            res.send(new ApiError('Nurse not found'));
            return;
        }

        const patients: IUserModel[] = [];

        for (const patientId of nurse.associatedUsers) {
            try {
                const patient = await User.findById(patientId,
                    {
                        __v: 0,
                        associatedUsers: 0
                    });

                patients.push(patient);
            } catch (e) {
                return next(e);
            }
        }

        res.json(patients.map(c => c.toDTO()));
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
                { _id: studentId },
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
