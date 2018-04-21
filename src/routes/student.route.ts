import {Router} from 'express';
import {ensureAuthenticated} from '../config/passport';
import {StudentController} from '../controllers/student.controller';

export function registerStudentRoutes(router: Router) {
    router
        .get('/api/students',
            ensureAuthenticated,
            StudentController.getAll
        )
        .get('/api/students/:studentId',
            ensureAuthenticated,
            StudentController.getById
        )
        .patch('/api/students/:studentId',
            ensureAuthenticated,
            StudentController.update
        )
        .get('/api/students/:studentId/courses',
            ensureAuthenticated,
            StudentController.getRegisteredCourses
        )
    ;
}
