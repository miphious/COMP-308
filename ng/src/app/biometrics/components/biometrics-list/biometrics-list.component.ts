import { Component, Input, OnInit } from '@angular/core';
import { Biometrics } from '../../models/biometrics';

@Component({
    selector: 'app-biometrics-list',
    templateUrl: './biometrics-list.component.html'
})
export class BiometricsListComponent implements OnInit {
    @Input() biometricsList: Biometrics[];

    constructor() {
    }

    ngOnInit() {
    }
}
