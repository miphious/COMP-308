import * as mongoose from 'mongoose';
import { UserModelName } from './user.model';

export const DailyTipModelName = 'daily-tip';

export interface IDailyTipModel extends mongoose.Document {
    text: string;
    link?: string;
    postedAt: Date;
    patient: mongoose.Schema.Types.ObjectId;
    postedBy: mongoose.Schema.Types.ObjectId;

    toDTO(): any;
}

export function registerModelDailyTip() {
    const DailyTipSchema = new mongoose.Schema({
        text: {
            type: String,
            required: 'Text is required',
        },
        link: {
            type: String
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

    DailyTipSchema.methods.toDTO = function () {
        const tip: IDailyTipModel = this;

        const dto = tip.toObject();

        dto.id = dto._id;
        delete dto._id;
        delete dto.__v;

        return dto;
    };

    mongoose.model(DailyTipModelName, DailyTipSchema);
}

export function getModelDailyTip() {
    return mongoose.model<IDailyTipModel>(DailyTipModelName);
}
