import * as passport from 'passport';
import {Strategy, IVerifyOptions} from 'passport-local';
import {getModelStudent} from '../../models/student.model';

async function verifyUser(username: string, password: string,
                          done: (error: any, user?: any, options?: IVerifyOptions) => void) {
    const Student = getModelStudent();
    let user;
    try {
        user = await Student.findOne({
            email: {$regex: new RegExp(`^${username}$`, 'i')}
        });
    } catch (e) {
        return done(e);
    }

    if (!user) {
        return done(null, false, {
            message: 'Unknown user'
        });
    }

    if (user.verifyPassword(password)) {
        done(null, user);
    } else {
        done(null, false, {
            message: 'Invalid password'
        });
    }
}

export function configureLocalStrategy() {
    passport.use('local', new Strategy(verifyUser));
}
