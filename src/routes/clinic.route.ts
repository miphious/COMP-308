import { Router } from 'express';
import { ensureAuthenticated } from '../config/passport';
import { ClinicController } from '../controllers/clinic.controller';

export function registerClinicRoutes(router: Router) {
    router
        .post('/api/clinic/register',
            ensureAuthenticated,
            ClinicController.registerPatient
        )
        .get('/api/clinic/examinations',
            ensureAuthenticated,
            ClinicController.getAllExaminations
        )
        .post('/api/clinic/examinations',
            ensureAuthenticated,
            ClinicController.addExamination
        )
    ;
}
