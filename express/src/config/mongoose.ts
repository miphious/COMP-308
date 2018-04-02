import * as mongoose from 'mongoose';
import {loadAppConfigurations} from './app-config';
import {registerModelStudent} from '../models/student.model';
import {registerModelCourse} from '../models/course.model';

export async function configureMongoose() {
    const appConfig = loadAppConfigurations();
    const db = await mongoose.connect(appConfig.db);

    registerModelStudent();
    registerModelCourse();

    return db;
}
