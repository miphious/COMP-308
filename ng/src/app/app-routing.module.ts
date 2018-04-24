import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { NurseGuard } from './shared/guards/nurse.guard';
import { PatientGuard } from './shared/guards/patient.guard';
import { HomeComponent } from './main/components/home/home.component';
import { LoginComponent } from './main/components/login/login.component';
import { RegisterComponent } from './main/components/register/register.component';
import { ProfileComponent } from './main/components/profile/profile.component';
import { ErrorComponent } from './main/components/error/error.component';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
    {
        path: 'nurse',
        loadChildren: 'app/nurse/nurse.module#NurseModule',
        canActivate: [AuthGuard, NurseGuard],
        canLoad: [NurseGuard]
    },
    {
        path: 'patient',
        loadChildren: 'app/patient/patient.module#PatientModule',
        canActivate: [AuthGuard, PatientGuard],
        canLoad: [PatientGuard]
    },
    {
        path: 'examinations',
        loadChildren: 'app/examination/examination.module#ExaminationModule',
        data: {preload: true},
        canActivate: [AuthGuard]
    },
    {path: 'error', component: ErrorComponent},
    {path: '', pathMatch: 'full', redirectTo: 'home'},
    {path: '**', component: ErrorComponent},
];

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forRoot(routes, {preloadingStrategy: SelectivePreloadingStrategy}),
    ],
    providers: [SelectivePreloadingStrategy],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
