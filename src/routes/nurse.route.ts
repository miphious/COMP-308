import { Router } from 'express';
import { ensureAuthenticated } from '../config/passport';
import { NurseController } from '../controllers/nurseController';

export function registerNurseRoutes(router: Router) {
    router
        .get('/api/nurses',
            ensureAuthenticated,
            NurseController.getAll
        )
        .get('/api/nurses/:nurseId',
            ensureAuthenticated,
            NurseController.getById
        )
        .patch('/api/nurses/:nurseId',
            ensureAuthenticated,
            NurseController.update
        )
        .get('/api/nurses/:nurseId/patients',
            ensureAuthenticated,
            NurseController.getPatients
        )
    ;
}
