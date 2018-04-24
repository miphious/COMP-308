import * as mongoose from 'mongoose';
import { UserModelName } from './user.model';

export const BiometricsModelName = 'biometrics';

export interface IBiometricsModel extends mongoose.Document {
    bodyTemperature: string;
    heartRate: string;
    bloodPressure: string;
    respiratoryRate: string;
    postedAt: Date;
    patient: mongoose.Schema.Types.ObjectId;
    postedBy: mongoose.Schema.Types.ObjectId;

    toDTO(): any;
}

export function registerModelBiometrics() {
    const BiometricsSchema = new mongoose.Schema({
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

    BiometricsSchema.methods.toDTO = function () {
        const biometrics: IBiometricsModel = this;

        const dto = biometrics.toObject();

        dto.id = dto._id;
        delete dto._id;
        delete dto.__v;

        return dto;
    };

    mongoose.model(BiometricsModelName, BiometricsSchema);
}

export function getModelBiometrics() {
    return mongoose.model<IBiometricsModel>(BiometricsModelName);
}
