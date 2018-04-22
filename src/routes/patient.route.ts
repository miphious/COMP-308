import { Router } from 'express';
import { ensureAuthenticated } from '../config/passport';
import { PatientController } from '../controllers/patient.controller';

export function registerPatientRoutes(router: Router) {
    router
        .get('/api/patients',
            ensureAuthenticated,
            PatientController.getAll
        )
        .get('/api/patients/:patientId',
            ensureAuthenticated,
            PatientController.getById
        )
        .patch('/api/patients/:patientId',
            ensureAuthenticated,
            PatientController.update
        )
        .get('/api/patients/:patientId/nurses',
            ensureAuthenticated,
            PatientController.getNurses
        )
        ;
}
