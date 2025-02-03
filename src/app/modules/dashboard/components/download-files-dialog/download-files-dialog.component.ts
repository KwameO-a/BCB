import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-download-files-dialog',
  templateUrl: 'download-files-dialog.component.html',
  styleUrls: ['./download-files-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DownloadFilesDialogComponent implements OnInit {

  comment: string = "";
  assetUrl = environment.assetsUrl;
  message = "";
  checkerId = ""
  //@ts-ignore
  commentFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

   this.message =  this.data.message;
    this.checkerId = this.data.checkerId;
    
  }

  ngOnInit(): void {
    this.commentFormGroup = this._formBuilder.group({ //@ts-ignore
      checkerId: new FormControl({ value: this.data.checkerId, disabled: true }, Validators.required), //@ts-ignore
      comment: new FormControl({ value: this.comment }, Validators.required),
    });
  }


  onNoClick(): void {
    this.dialogRef.close(null);
  }

  closeDialog() {
    this.dialogRef.close(null);
  }
}
