import { Request, Response, NextFunction } from 'express';
const MachineLearning = require('machine_learning');
import { IUserModel, getModelUser } from '../models/user.model';
import { getModelBiometrics, IBiometricsModel } from '../models/biometrics.model';
import { ApiError } from '../models/api-error';
import { getModelDailyTip, IDailyTipModel } from '../models/daily-tip.model';
import { getModelEmergencyAlert, IEmergencyAlertModel } from '../models/emergency-alert.model';

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

    public static async getEmergencyAlerts(req: Request, res: Response, next: NextFunction) {
        const EmergencyAlert = getModelEmergencyAlert();
        let alerts: IEmergencyAlertModel[];

        try {
            alerts = await EmergencyAlert.find({}, { __v: 0 });
        } catch (e) {
            return next(e);
        }

        res.json(alerts.map(s => s.toDTO()));
    }

    public static async addEmergencyAlert(req: Request, res: Response, next: NextFunction) {
        const EmergencyAlert = getModelEmergencyAlert();
        const alert = new EmergencyAlert({ patient: req.user.id, postedAt: new Date() });

        try {
            await alert.save();
        } catch (e) {
            return next(e);
        }

        res.statusCode = 201;
        return res.json(alert.toDTO());
    }

    public static async predict(req: Request, res: Response, next: NextFunction) {
        //read the new data
        const fever = req.body.fever || 'no';
        const diarrhea = req.body.diarrhea || 'no';
        const muscleAches = req.body.muscleAches || 'no';
        const coughing = req.body.coughing || 'no';
        const severeHeadache = req.body.severeHeadache || 'no';
        const fatigue = req.body.fatigue || 'no';
        const visionProblems = req.body.visionProblems || 'no';
        const chestPain = req.body.chestPain || 'no';
        const difficultyBreathing = req.body.difficultyBreathing || 'no';
        const irregularHeartbeat = req.body.irregularHeartbeat || 'no';
        const chestDiscomfort = req.body.chestDiscomfort || 'no';
        const nausea = req.body.nausea || 'no';
        const indigestion = req.body.indigestion || 'no';
        const heartburn = req.body.heartburn || 'no';
        const stomachPain = req.body.stomachPain || 'no';
        const age = req.body.age;
        const days = req.body.days;

        // Predicting influenza
        //fever, diarrhea, muscleAches, coughing, severeHeadache, Fatigue, visionProblems, chestPain, difficultyBreathing, irregularHeartbeat, chestDiscomfort, nausea, indigestion, heartburn, stomachPain
        const data =
            [
                ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 60, 5],
                ['yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 30, 6],
                ['yes', 'no', 'yes', 'yes', 'no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 40, 7],
                ['yes', 'no', 'no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 20, 2],
                ['yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 30, 3],
                ['no', 'no', 'no', 'yes', 'no', 'no', 'no', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 20, 7],

                ['yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 60, 1],
                ['yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 30, 2],
                ['yes', 'no', 'yes', 'yes', 'no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 40, 2],
                ['yes', 'no', 'no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 20, 1],
                ['yes', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 30, 4],
                ['no', 'no', 'no', 'yes', 'no', 'no', 'no', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 20, 2],

                ['no', 'no', 'no', 'no', 'yes', 'yes', 'no', 'no', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 40, 10],
                ['no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 30, 15],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'no', 'no', 'no', 'no', 'no', 'no', 20, 20],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'yes', 'no', 'no', 'no', 'no', 38, 25],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'no', 'yes', 'yes', 'no', 'no', 'no', 'no', 60, 30],

                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'no', 'yes', 'yes', 'no', 'no', 'no', 'no', 70, 5],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'no', 'yes', 'no', 55, 3],
                ['no', 'no', 'no', 'no', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 35, 7],
                ['no', 'no', 'no', 'no', 'yes', 'no', 'yes', 'no', 'no', 'yes', 'no', 'no', 'yes', 'yes', 'no', 40, 6],
                ['no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'no', 'yes', 'yes', 'no', 'yes', 'yes', 'yes', 'no', 65, 4],

                ['no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'no', 'yes', 'yes', 'no', 'yes', 'yes', 'yes', 'no', 75, 15],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'yes', 25, 20],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'no', 33, 30],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 45, 25],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'yes', 33, 13],

                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'no', 45, 2],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 65, 3],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'no', 'no', 'no', 'yes', 'yes', 'yes', 'yes', 33, 5],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'no', 'no', 'no', 'no', 'yes', 'yes', 'no', 45, 7],
                ['no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'no', 'no', 'no', 'no', 'yes', 'yes', 'yes', 65, 10]
            ];

        //decision made
        const result = [
            'Influenza+See a doctor', 'Influenza+See a doctor', 'Influenza+See a doctor', 'Cold+Stay warm', 'Influenza+See a doctor', 'Cold+See a doctor',
            'Might be Influenza+See a doctor if longer', 'Might be Influenza+See a doctor if longer', 'Might be Influenza+See a doctor if longer', 'Cold+Stay warm', 'Might be Influenza+See a doctor if longer', 'Cold+Stay warm',
            'HeartDisease+See a doctor', 'HeartDisease+See a doctor', 'HeartDisease+See a doctor', 'HeartDisease+See a doctor', 'HeartDisease+See a doctor',
            'Might be HeartDisease+See a doctor if longer', 'Might be HeartDisease+See a doctor if longer', 'Might be Hypertension+See a doctor if longer', 'Might be Hypertension+See a doctor if longer', 'Might be Hypertension+See a doctor if longer',
            'Acidity+See a doctor', 'Acidity+See a doctor', 'Acidity + See a doctor', 'Acidity+See a doctor', 'Acidity+See a doctor',
            'Might be Acidity+See a doctor if longer', 'Might be Acidity+See a doctor if longer', 'Might be Acidity+See a doctor if longer', 'Might be Acidity+See a doctor if longer', 'Might be Acidity+See a doctor if longer'
        ];

        //create new Decision Tree using this dataset
        const dt = new MachineLearning.DecisionTree({
            data: data,
            result: result
        });

        dt.build();

        //classify new data using this Decision Tree
        const classificationResult = dt.classify([fever, diarrhea, muscleAches, coughing, severeHeadache, fatigue, visionProblems, chestPain, difficultyBreathing, irregularHeartbeat, chestDiscomfort, nausea, indigestion, heartburn, stomachPain, age, days])
        const tree = dt.getTree();

        //Pruning Decision Tree is recommended to avoid overfitting
        // Decision Tree in this library uses simple pruning algorithm
        // which merges two branches of Decision Tree
        // when entropy loss of merging the two branches
        // is smaller than mingain value.
        dt.prune(1.0); // 1.0 : mingain.

        // Use the 'response' object to render the 'index' view with a 'title' property
        // res.render('./results.ejs', {
        //     classificationResult: JSON.stringify(classificationResult),
        //     tree: tree
        // }
        res.json(classificationResult);
    }
}
