import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {AuthGuard} from '../guards/auth.guard';

import {HomeComponent} from '../components/home/home.component';
import {LoginComponent} from '../components/login/login.component';
import {RegisterComponent} from '../components/register/register.component';
import {ProfileComponent} from '../components/profile/profile.component';
import {StudentsListComponent} from '../components/students-list/students-list.component';
import {StudentComponent} from '../components/student/student.component';
import {CoursesListComponent} from '../components/courses-list/courses-list.component';
import {CourseComponent} from '../components/course/course.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {
        path: 'students', canActivate: [AuthGuard], children: [
            {path: 'all', component: StudentsListComponent},
            {path: 'view/:studentId', component: StudentComponent},
            {path: '', redirectTo: 'all', pathMatch: 'full'},
        ]
    },
    {
        path: 'courses', canActivate: [AuthGuard], children: [
            {path: 'all', component: CoursesListComponent},
            {path: 'view/:courseId', component: CourseComponent},
            {path: '', redirectTo: 'all', pathMatch: 'full'}
        ]
    },
    {path: '**', redirectTo: 'home'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class RoutingModule {
}
