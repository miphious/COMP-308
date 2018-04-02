import * as passport from 'passport';
import {NextFunction, Request, Response} from 'express';
import {configureLocalStrategy} from './strategies/local';
import {getModelStudent, IStudentModel} from '../models/student.model';

export function configurePassport() {
    passport.serializeUser<IStudentModel, string>(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser<IStudentModel, string>(function (id, done) {
        const Student = getModelStudent();
        Student.findById(id,
            {
                password: 0,
                salt: 0,
                __v: 0
            },
            (err, user) => {
                done(err, user);
            });
    });

    configureLocalStrategy();
}

export function authenticateUser(req: Request, res: Response, next: NextFunction) {
    return passport.authenticate(['local'])(req, res, next);
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401);
        res.send({ok: false});
    }
}
