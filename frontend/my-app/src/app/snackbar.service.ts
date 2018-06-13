import {Component, Inject, Injectable} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar, MatSnackBarConfig} from "@angular/material";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    public snackBar: MatSnackBar) {
  }


  ErrorSnackBar(text: String) {
    let config = new MatSnackBarConfig();
    config.panelClass = 'snackbar-error';
    config.duration = 5000;
    config.data = 'Error: ' + text;
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }


  SuccesSnackBar(text: String) {
    let config = new MatSnackBarConfig();
    config.panelClass = 'snackbar-succes';
    config.duration = 5000;
    config.data = 'Succes: ' + text;
    this.snackBar.openFromComponent(SnackbarComponent, config);
  }
}

  @Component({
    selector: 'snack-bar-component',
    templateUrl: 'snack-bar-component.html',
    styles: [],
  })
  export class SnackbarComponent {constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }}


