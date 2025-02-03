import { Injectable } from '@angular/core';
import {  MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  durationInSeconds = 5;

  constructor(private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, caption: string) {
    this._snackBar.open(message, caption, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass : ['success-toast']
    });
  }


  /**
    * 
    * @param message 
    * @param type 
    * @param duration 
    */
  showToast(message: string, type: string, duration = 10000) {
    this._snackBar.open(message, "", {
      duration,
      verticalPosition: "top",
      panelClass: [type]
    });
  }
}
