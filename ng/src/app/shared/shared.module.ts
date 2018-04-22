import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { StudentService } from './services/student.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
    ],
    declarations: [],
    providers: [
        AuthService,
        StudentService,
    ]
})
export class SharedModule {
}
