import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.css']
})
export class SnackComponent implements OnInit {

    constructor( @Inject(MAT_SNACK_BAR_DATA) public data: number) { }

    ngOnInit() {
        console.log(this.data);
    }

}
