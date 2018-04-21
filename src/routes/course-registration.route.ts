import {Router} from 'express';
import {ensureAuthenticated} from '../config/passport';
import {CourseRegistrationController} from '../controllers/course-registration.controller';

export function registerCourseRegistrationRoutes(router: Router) {
    router
        .post('/api/registrations',
            ensureAuthenticated,
            CourseRegistrationController.takeCourse
        )
        .delete('/api/registrations',
            ensureAuthenticated,
            CourseRegistrationController.dropCourse
        )
    ;
}
