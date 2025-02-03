import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';


@Component({
  selector: 'app-terms-and-conditions-dialog',
  templateUrl: 'terms-and-conditions-dialog.component.html',
  styleUrls: ['./terms-and-conditions-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsDialogComponent implements OnInit {

  comment: string = "";
  assetUrl = environment.assetsUrl;
  message = "";
  checkerId = ""


  terms = false;
  declaration = false;



  ngAfterViewChecked() {

  }
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
      terms: new FormControl({ value: false, disabled: false }, Validators.required), //@ts-ignore
      decalarations: new FormControl({ value: false }, Validators.required),
    });
  }


  switchTerms(event  : MatCheckboxChange){
    this.terms = event.checked;
  }

  switchDeclaration(event  : MatCheckboxChange){
    this.declaration = event.checked;
  }

  onNoClick(): void {
    this.dialogRef.close(null);
  }

  submit() {
    this.dialogRef.close({
      verified : this.declaration && this.terms
    });
  }
}
