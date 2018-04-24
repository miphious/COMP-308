import { Request, Response, NextFunction } from 'express';
import { IUserModel, getModelUser } from '../models/user.model';
import { getModelBiometrics, IBiometricsModel } from '../models/biometrics.model';
import { ApiError } from '../models/api-error';
import { getModelDailyTip, IDailyTipModel } from '../models/daily-tip.model';

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

    public static async getAllBiometrics(req: Request, res: Response, next: NextFunction) {
        const patientId: string = req.params.patientId;

        const Biometrics = getModelBiometrics();
        let biometrics: IBiometricsModel[];

        try {
            biometrics = await Biometrics.find({ patient: patientId }, { __v: 0 });
        } catch (e) {
            return next(e);
        }

        res.json(biometrics.map(s => s.toDTO()));
    }

    public static async addBiometrics(req: Request, res: Response, next: NextFunction) {
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

        const Biometrics = getModelBiometrics();

        const reqBody = Object.assign({}, req.body);
        reqBody.postedAt = new Date();
        reqBody.postedBy = req.user.id;

        const newBiometrics = new Biometrics(reqBody);

        try {
            await newBiometrics.save();
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        return res.json(newBiometrics.toDTO());
    }

    public static async getDailyTips(req: Request, res: Response, next: NextFunction) {
        const patientId: string = req.params.patientId;

        const DailyTip = getModelDailyTip();
        let tips: IDailyTipModel[];

        try {
            tips = await DailyTip.find({ patient: patientId }, { __v: 0 });
        } catch (e) {
            return next(e);
        }

        res.json(tips.map(s => s.toDTO()));
    }

    public static async addDailyTip(req: Request, res: Response, next: NextFunction) {
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

        const DailyTip = getModelDailyTip();

        const reqBody = Object.assign({}, req.body);
        reqBody.postedAt = new Date();
        reqBody.postedBy = req.user.id;

        const newTip = new DailyTip(reqBody);

        try {
            await newTip.save();
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        return res.json(newTip.toDTO());
    }
}
