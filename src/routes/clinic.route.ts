import { Router } from 'express';
import { ensureAuthenticated } from '../config/passport';
import { ClinicController } from '../controllers/clinic.controller';

export function registerClinicRoutes(router: Router) {
    router
        .post('/api/clinic/register',
            ensureAuthenticated,
            ClinicController.registerPatient
        )
        .delete('/api/clinic/register',
            ensureAuthenticated,
            ClinicController.unregisterPatient
        )
        .get('/api/clinic/biometrics/:patientId',
            ensureAuthenticated,
            ClinicController.getAllBiometrics
        )
        .post('/api/clinic/biometrics',
            ensureAuthenticated,
            ClinicController.addBiometrics
        )
        .get('/api/clinic/daily-tips/:patientId',
            ensureAuthenticated,
            ClinicController.getDailyTips
        )
        .post('/api/clinic/daily-tips',
            ensureAuthenticated,
            ClinicController.addDailyTip
        )
        .get('/api/clinic/emergency-alert',
            ensureAuthenticated,
            ClinicController.getEmergencyAlerts
        )
        .post('/api/clinic/emergency-alert',
            ensureAuthenticated,
            ClinicController.addEmergencyAlert
        )
        .post('/api/clinic/predictions',
            ensureAuthenticated,
            ClinicController.predict
        )
        ;
}
