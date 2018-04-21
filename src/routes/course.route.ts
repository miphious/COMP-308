import {Router} from 'express';
import {ensureAuthenticated} from '../config/passport';
import {CourseController} from '../controllers/course.controller';

export function registerCourseRoutes(router: Router) {
    router
        .get('/api/courses',
            ensureAuthenticated,
            CourseController.getAll
        )
        .get('/api/courses/:courseId',
            ensureAuthenticated,
            CourseController.getById
        )
        .post('/api/courses',
            ensureAuthenticated,
            CourseController.create
        )
        .patch('/api/courses/:courseId',
            ensureAuthenticated,
            CourseController.update
        )
        .delete('/api/courses/:courseId',
            ensureAuthenticated,
            CourseController.delete
        )
        .get('/api/courses/:courseId/students',
            ensureAuthenticated,
            CourseController.getStudentsInCourse
        )
    ;
}
