import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  IGenerateOTPResponse,
  IOTPDialogRequest,
  IOTPDialogRespons,
  IValidateOTPRequest,
} from 'src/app/shared/models/authentication.model';
import {
  ILoginModel,
  ILoginResponse,
  IRole,
} from 'src/app/shared/models/login.model';
import { APIService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { StateStorageService } from 'src/app/shared/services/state-storage.service';
import { environment } from 'src/environments/environment';

export type AuthType = 'PHONE' | 'EMAIL';

export enum FLOW {
  PHONE_VERIFICATION = 0,
  OTP_VERIFICATION = 1,
}

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
})
export class AuthenticationComponent implements OnInit {
  assetUrl = environment.assetsUrl;

  LOGIN_FLOW = FLOW;
  currentFlow = FLOW.PHONE_VERIFICATION;

  phoneAuth: FormGroup;

  //@ts-ignore
  authResp: IGenerateOTPResponse;

  authType: AuthType = 'PHONE';
  constructor(
    private _formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {
    this.phoneAuth = this._formBuilder.group({
      phone: ['', Validators.required],
    });
  }

  ngOnInit(): void { }

}
