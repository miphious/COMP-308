import {Request, Response, NextFunction} from 'express';
import {getModelUser, IUserModel} from '../models/user.model';

export class AuthController {
    public static async register(req: Request, res: Response, next: NextFunction) {
        const User = getModelUser();
        const student = new User(req.body);

        try {
            await student.save();
        } catch (e) {
            return next(e);
        }

        return res.json(student.toDTO());
    }

    public static login(req: Request, res: Response, next: NextFunction) {
        req.login(req.user, function (err) {
            if (err) {
                return next(err);
            } else {
                const userDto = (req.user as IUserModel).toDTO();

                return res.json(userDto);
            }
        });
    }

    public static logout(req: Request, res: Response, next: NextFunction) {
        req.logout();
        res.statusCode = 204;
        res.send();
        return;
    }
}
