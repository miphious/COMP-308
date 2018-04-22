import { Request, Response, NextFunction } from 'express';
import { IUserModel, getModelUser } from '../models/user.model';
import { ApiError } from '../models/api-error';

export class PatientController {

    public static async getAll(req: Request, res: Response, next: NextFunction) {
        const User = getModelUser();
        let patients: IUserModel[];

        try {
            patients = await User.find(
                { role: 'patient' },
                {
                    salt: 0,
                    password: 0,
                    __v: 0
                });
        } catch (e) {
            return next(e);
        }

        res.json(patients.map(s => s.toDTO()));
    }

    public static async getById(req: Request, res: Response, next: NextFunction) {
        const patientId: string = req.params.patientId;
        const User = getModelUser();
        let patient;

        try {
            patient = await User.findById(
                { _id: patientId, role: 'patient' }
                , {
                    __v: 0,
                    password: 0,
                    salt: 0
                });
        } catch (e) {
            return next(e);
        }

        if (!patient) {
            res.status(404);
            res.send(new ApiError('Patient not found'));
            return;
        }

        res.json(patient.toDTO());
    }

    public static async getNurses(req: Request, res: Response, next: NextFunction) {
        const patientId: string = req.params.patientId;

        const User = getModelUser();
        let patient: IUserModel;

        try {
            patient = await User.findOne(
                { _id: patientId, role: 'patient' },
                {
                    _id: 0,
                    associatedUsers: 1
                });
        } catch (e) {
            return next(e);
        }

        if (!patient) {
            res.status(404);
            res.send(new ApiError('Patient not found'));
            return;
        }

        const nurses: IUserModel[] = [];

        for (const nurseId of patient.associatedUsers) {
            try {
                const nurse = await User.findById(nurseId,
                    {
                        __v: 0,
                        associatedUsers: 0
                    });

                nurses.push(nurse);
            } catch (e) {
                return next(e);
            }
        }

        res.json(nurses.map(c => c.toDTO()));
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
