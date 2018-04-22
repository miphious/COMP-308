import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';

import { HomeComponent } from './main/components/home/home.component';
import { LoginComponent } from './main/components/login/login.component';
import { RegisterComponent } from './main/components/register/register.component';
import { ProfileComponent } from './main/components/profile/profile.component';
import { NotFoundComponent } from './main/components/not-found/not-found.component';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {path: 'nurse', loadChildren: 'app/nurse/nurse.module#NurseModule'},
    {path: 'patient', loadChildren: 'app/patient/patient.module#PatientModule'},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    providers: [AuthGuard],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
