import { Component, Input, OnInit } from '@angular/core';
import { Examination } from '../../models/examination';

@Component({
    selector: 'app-examinations-list',
    templateUrl: './examinations-list.component.html'
})
export class ExaminationsListComponent implements OnInit {
    @Input() examinations: Examination[];

    constructor() {
    }

    ngOnInit() {
    }
}
