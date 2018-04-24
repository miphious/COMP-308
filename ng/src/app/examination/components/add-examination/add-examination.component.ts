import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Examination } from '../../models/examination';
import { getErrorMessage } from '../../../shared/helpers/helpers';

@Component({
    selector: 'app-add-examination',
    templateUrl: './add-examination.component.html'
})
export class AddExaminationComponent implements OnInit {
    @Input() patientId: string;
    @Output() examinationPosted = new EventEmitter<Examination>();
    examination = new Examination();
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
        //             form.reset(new Examination());
        //             this.examinationPosted.emit(newCourse);
        //         },
        //         e => {
        //             this.error = getErrorMessage(e);
        //             this.isSending = false;
        //         }
        //     );
    }
}
