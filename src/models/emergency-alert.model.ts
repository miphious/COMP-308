import * as mongoose from 'mongoose';
import { UserModelName } from './user.model';

export const EmergencyAlertModelName = 'emergency-alert';

export interface IEmergencyAlertModel extends mongoose.Document {
    postedAt: Date;
    patient: mongoose.Schema.Types.ObjectId;

    toDTO(): any;
}

export function registerModelEmergencyAlert() {
    const EmergencyAlertSchema = new mongoose.Schema({
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: UserModelName,
            required: 'Patient id is required'
        },
        postedAt: Date
    });

    EmergencyAlertSchema.methods.toDTO = function () {
        const alert: IEmergencyAlertModel = this;

        const dto = alert.toObject();

        dto.id = dto._id;
        delete dto._id;
        delete dto.__v;

        return dto;
    };

    mongoose.model(EmergencyAlertModelName, EmergencyAlertSchema);
}

export function getModelEmergencyAlert() {
    return mongoose.model<IEmergencyAlertModel>(EmergencyAlertModelName);
}
