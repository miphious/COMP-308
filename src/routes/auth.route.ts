import {Router} from 'express';
import {AuthController} from '../controllers/auth.controller';
import {authenticateUser, ensureAuthenticated} from '../config/passport';

export function registerAuthRoutes(router: Router) {
    router
        .post('/api/register',
            AuthController.register
        )
        .post('/api/login',
            authenticateUser,
            AuthController.login
        )
        .post('/api/logout',
            ensureAuthenticated,
            AuthController.logout
        )
    ;
}
