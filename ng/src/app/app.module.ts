import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {RoutingModule} from './routes/routing.module';
import {AppComponent} from './app.component';
import {RegisterComponent} from './components/register/register.component';
import {LoginComponent} from './components/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {AddCourseComponent} from './components/courses-list/add-course/add-course.component';
import {CourseService} from './services/course.service';
import {StudentService} from './services/student.service';
import {AuthGuard} from './guards/auth.guard';
import {StudentsListComponent} from './components/students-list/students-list.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AuthService} from './services/auth.service';
import {StudentComponent} from './components/student/student.component';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {CourseComponent} from './components/course/course.component';

@NgModule({
    declarations: [
        AppComponent,
        RegisterComponent,
        LoginComponent,
        NavbarComponent,
        HomeComponent,
        AddCourseComponent,
        ProfileComponent,
        StudentComponent,
        CourseComponent,
        StudentsListComponent,
        CoursesListComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgbModule.forRoot(),
    ],
    providers: [
        AuthGuard,
        AuthService,
        StudentService,
        CourseService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
