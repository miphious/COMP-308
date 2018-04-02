import * as express from 'express';
import * as morgan from 'morgan';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';

import {loadAppConfigurations} from './config/app-config';
import {configureMongoose} from './config/mongoose';
import {configurePassport} from './config/passport';
import {registerAuthRoutes} from './routes/auth.route';
import {registerStudentRoutes} from './routes/student.route';
import {registerCourseRoutes} from './routes/course.route';
import {registerCourseRegistrationRoutes} from './routes/course-registration.route';

// noinspection JSUnusedGlobalSymbols
export class Server {
    public app: express.Application;

    // noinspection JSUnusedGlobalSymbols
    public static async bootstrap() {
        const server = new Server();

        await server.configureApp();
        await server.registerRoutes();
        server.registerErrorHandler();

        return server;
    }

    constructor() {
        this.app = express();
    }

    private async configureApp() {
        process.env.NODE_ENV = process.env.NODE_ENV || 'development';
        const appConfig = loadAppConfigurations();

        await configureMongoose();
        configurePassport();

        this.app.use(morgan(<any>'dev'));


        this.app.use(bodyParser.urlencoded({
            extended: true
        }));
        this.app.use(bodyParser.json());

        this.app.use(cookieParser());

        this.app.use(session({
            secret: appConfig.sessionSecret,
            resave: true,
            saveUninitialized: true
        }));

        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private async registerRoutes() {
        const router = express.Router({
            caseSensitive: false
        });

        registerAuthRoutes(router);
        registerStudentRoutes(router);
        registerCourseRoutes(router);
        registerCourseRegistrationRoutes(router);

        this.app.use(router);
    }

    private registerErrorHandler() {
        this.app.use((err: any, req: express.Request, res: express.Response) => {
            const errorPayload = {
                ok: false,
                error: err.message,
            };
            res.status(err.status || 500);
            res.json(errorPayload);
        });
    }
}
