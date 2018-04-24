import * as mongoose from 'mongoose';
import { loadAppConfigurations } from './app-config';
import { registerModelUser } from '../models/user.model';
import { registerModelBiometrics } from '../models/biometrics.model';
import { registerModelDailyTip } from '../models/daily-tip.model';
import { registerModelEmergencyAlert } from '../models/emergency-alert.model';

export async function configureMongoose() {
    const appConfig = loadAppConfigurations();
    const db = await mongoose.connect(appConfig.db);

    registerModelUser();
    registerModelBiometrics();
    registerModelDailyTip();
    registerModelEmergencyAlert();

    return db;
}
