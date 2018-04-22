import * as mongoose from 'mongoose';
import { loadAppConfigurations } from './app-config';
import { registerModelUser } from '../models/user.model';
import { registerModelExamination } from '../models/examination.model';

export async function configureMongoose() {
    const appConfig = loadAppConfigurations();
    const db = await mongoose.connect(appConfig.db);

    registerModelUser();
    registerModelExamination();

    return db;
}
