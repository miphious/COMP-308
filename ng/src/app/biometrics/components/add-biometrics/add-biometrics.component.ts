import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Biometrics } from '../../models/biometrics';
import { getErrorMessage } from '../../../shared/helpers/helpers';

@Component({
    selector: 'app-add-biometrics',
    templateUrl: './add-biometrics.component.html'
})
export class AddBiometricsComponent implements OnInit {
    @Input() patientId: string;
    @Output() biometricsPosted = new EventEmitter<Biometrics>();
    biometrics = new Biometrics();
    error?: string;
    isSending = false;

    constructor(
        // private _courseService: CourseService
    ) {
    }

    ngOnInit(): void {
    }

    submitExamination(form: NgForm) {
        this.isSending = true;
        this.error = null;

        // this._courseService
        //     .addCourse(this.course)
        //     .subscribe(
        //         newCourse => {
        //             this.isSending = false;
        //             form.reset(new Biometrics());
        //             this.biometricsPosted.emit(newCourse);
        //         },
        //         e => {
        //             this.error = getErrorMessage(e);
        //             this.isSending = false;
        //         }
        //     );
    }
}
