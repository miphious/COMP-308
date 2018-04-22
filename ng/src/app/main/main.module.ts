import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        SharedModule,
    ],
    declarations: [
        NavbarComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        NotFoundComponent,
    ],
    exports: [
        NavbarComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        ProfileComponent,
        NotFoundComponent,
    ]
})
export class MainModule {
}
