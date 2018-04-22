import * as mongoose from 'mongoose';
import { UserModelName } from './user.model';

export const ExaminationModelName = 'examination';

export interface IExaminationModel extends mongoose.Document {
    bodyTemperature: string;
    heartRate: string;
    bloodPressure: string;
    respiratoryRate: string;
    postedAt: Date;
    patient: mongoose.Schema.Types.ObjectId;
    postedBy: mongoose.Schema.Types.ObjectId;

    toDTO(): any;
}

export function registerModelExamination() {
    const ExaminationSchema = new mongoose.Schema({
        bodyTemperature: {
            type: String,
            required: 'Body temperature is required',
        },
        heartRate: {
            type: String,
            required: 'Heart rate is required',
        },
        bloodPressure: {
            type: String,
            required: 'Blood pressure is required',
        },
        respiratoryRate: {
            type: String,
            required: 'Respiratory Rate is required',
        },
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModelName,
            required: 'Patient id is required'
        },
        postedAt: Date,
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModelName
        }
    });

    ExaminationSchema.methods.toDTO = function () {
        const exam: IExaminationModel = this;

        const dto = exam.toObject();

        dto.id = dto._id;
        delete dto._id;
        delete dto.__v;

        return dto;
    };

    mongoose.model(ExaminationModelName, ExaminationSchema);
}

export function getModelExamination() {
    return mongoose.model<IExaminationModel>(ExaminationModelName);
}
