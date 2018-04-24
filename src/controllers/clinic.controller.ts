import { Request, Response, NextFunction } from 'express';
import { IUserModel, getModelUser } from '../models/user.model';
import { getModelExamination, IExaminationModel } from '../models/examination.model';
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
        const patientId: string = req.query.patient;
        const nurseId: string = req.query.nurse;

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

        if (
            nurse.associatedUsers.every(id => id.toString() !== patientId) ||
            patient.associatedUsers.every(id => id.toString() !== nurseId)
        ) {
            res.status(404);
            res.send(new ApiError('No such registration exists'));
            return;
        }

        try {
            await patient.update({ $pull: { associatedUsers: nurseId } });
            await nurse.update({ $pull: { associatedUsers: patientId } });
        } catch (e) {
            return next(e);
        }

        res.statusCode = 204;
        res.send();
    }

    public static async getAllExaminations(req: Request, res: Response, next: NextFunction) {
        const patientId: string = req.params.patientId;

        const Examination = getModelExamination();
        let exams: IExaminationModel[];

        try {
            exams = await Examination.find({ patient: patientId }, { __v: 0 });
        } catch (e) {
            return next(e);
        }

        res.json(exams.map(s => s.toDTO()));
    }

    public static async addExamination(req: Request, res: Response, next: NextFunction) {
        const User = getModelUser();

        let patient: IUserModel;
        try {
            patient = await User.findOne({ _id: req.body.patient, role: 'patient' });
        } catch (e) {
            return next(e);
        }
        if (!patient) {
            res.status(404);
            res.send(new ApiError('Patient not found'));
            return;
        }

        const Examination = getModelExamination();

        const reqBody = Object.assign({}, req.body);
        reqBody.postedAt = new Date();
        reqBody.postedBy = req.user.id;

        const examination = new Examination(reqBody);

        try {
            await examination.save();
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        return res.json(examination.toDTO());
    }
}
