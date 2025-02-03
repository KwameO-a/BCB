import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, map, Subscription } from 'rxjs';
import {
  AppConstant,
  PACKAGE_TYPES,
  PROGRESS_STATE,
} from 'src/app/shared/constants/app.constants';
import {
  AccountInfo,
  BusinessInfo,
  DigitalChannels,
  DocumentUploadInfo,
  IAccountInfo,
  IBusinessInfo,
  IDigitalChannels,
  IDocumentUploadSelectInfo,
  IPickedFile,
  ISaveClientInfoRequest,
  IUserAccountInfoResponse,
  SAVE_STATE,
  UserAccountInfoResponse,
} from 'src/app/shared/models/account.model';
import { ManagementInfo } from 'src/app/shared/models/management-info.model';
import { RequestHeaderInfo } from 'src/app/shared/models/request-header-info.model';
import { IRequirement } from 'src/app/shared/models/requirements.model';
import { FileInfo } from 'src/app/shared/models/upload.model';
import { APIService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  EventBusService,
  Events,
} from 'src/app/shared/services/event-bus.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TableControllerService } from 'src/app/shared/services/paging-controller.service';
import { UploadService } from 'src/app/shared/services/upload.service';
import { environment } from 'src/environments/environment';
import { TermsAndConditionsDialogComponent } from '../../components/terms-and-conditions-dialog/terms-and-conditions-dialog.component';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss'],
})
export class AddAccountComponent implements OnInit {
  assetUrl = environment.assetsUrl;

  navigationPosition = 0;
  totalSteps = 7;

  getTitleFromNavigationPosition(): string {
    let title: string;

    switch (this.navigationPosition) {
      case 0:
        title = '';
        break;
      case 1:
        title = 'Business Details';
        break;
      case 2:
        title = 'Account Details';
        break;
      case 3:
        title = 'Management Details';
        break;
      case 4:
        title = 'Digital Channels';
        break;
      case 5:
        title = 'Document Upload';
        break;
      default:
        title = '';
        break;
    }

    return title;
  }

  PAGE_STATE: PROGRESS_STATE = PROGRESS_STATE.DONE;
  PROGRESS = PROGRESS_STATE;

  PACKAGE_TYPES_LIST = PACKAGE_TYPES;

  //@ts-ignore
  accountData: IRequirement = null;

  businessInfo: IBusinessInfo = new BusinessInfo();

  //@ts-ignore
  managementInfo: IManagementInfo = null;

  documentUploadInfo: IDocumentUploadSelectInfo<IPickedFile[]> =
    new DocumentUploadInfo();
  accountInfo: IAccountInfo = new AccountInfo();
  digitalChannels: IDigitalChannels = new DigitalChannels();

  //accuont saved response object
  //@ts-ignore
  accountDetailsResponse: IUserAccountInfoResponse = null;

  //subscribes to the save and exot button
  _eventBusSub: Subscription;

  //user data response model

  userData: Partial<IUserAccountInfoResponse> | null = null;

  STATES = {
    businessInfoComplete: false,
    managementInfoComplete: false,
    digitalChannelsInfoComplete: false,
    accountInfoComplete: false,
    documentUploadInfoComplete: false,
  };

  constructor(
    private pager: TableControllerService,
    private api: APIService,
    private uploadService: UploadService,
    private authService: AuthService,
    private _formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private navigationService: NavigationService,
    private readonly eventBusService: EventBusService,
    private notificationService: NotificationService,
    private spinner: NgxSpinnerService,
    public dialog: MatDialog
  ) {
    const requestId = this.route.snapshot.paramMap.get('id') || '';
    this.getRequest(requestId);

    this._eventBusSub = this.eventBusService.on(
      Events.SAVE_AND_EXIT,
      (data: any) => {
        //if the application has been submitted, prevent them from submitting again
        if (
          this.userData &&
          (this.userData.status === 'INCOMPLETE' ||
            this.userData.status === 'DRAFT')
        ) {
          this.uploadFiles(true, SAVE_STATE.SAVE_AND_EXIT);
        } else {
          this.authService.logout();
          this.navigationService.navigateToLogin();
        }
      }
    );
  }

  getRequest(requestId: string) {
    const results = this.PACKAGE_TYPES_LIST.find((val) => val.id === requestId);
    if (results) {
      this.accountData = results;

      //get the users data is there is any available
      this.getUserData();
    } else {
      // navigate the user back to the services if logged in
      this.navigationService.navigateTo('/services');
    }
  }

  ngAfterViewChecked() {}

  ngOnInit(): void {}

  nextPage() {
    if (this.checkIfCurrentFormIsValid() && this.navigationPosition < 6) {
      //save current data and navigate to
      this.navigationPosition++;

      this.uploadFiles(true, SAVE_STATE.SAVE);
    } else {
      this.notificationService.showToast(
        `Please complete all the required fields to continue.`,
        'success-toast',
        10000
      );
    }
  }

  unpackResponse() {}

  checkIfCurrentFormIsValid() {
    if (this.navigationPosition === 0) return true;
    else if (this.navigationPosition === 1 && this.STATES.businessInfoComplete)
      return true;
    else if (this.navigationPosition === 2 && this.STATES.accountInfoComplete)
      return true;
    else if (
      this.navigationPosition === 3 &&
      this.STATES.managementInfoComplete
    ) {
      return true;
    } else if (
      this.navigationPosition === 4 &&
      this.STATES.digitalChannelsInfoComplete
    )
      return true;
    else if (
      this.navigationPosition === 5 &&
      this.STATES.documentUploadInfoComplete
    )
      return true;
    else if (this.navigationPosition === 6) return true;

    // this.notificationService.openSnackBar("", "")
    return false;
  }

  submit() {
    this.uploadFiles(true, SAVE_STATE.COMPLETE);
  }

  back() {
    if (this.navigationPosition === 0)
      this.navigationService.navigateToServices();
    else if (this.navigationPosition > 0) this.navigationPosition--;
  }

  navigateToForm(position: number) {
    this.navigationPosition = position;
  }

  saveCurrentForm(showSpinner = false, state = SAVE_STATE.SAVE) {
    const final = state === SAVE_STATE.COMPLETE ? true : false;

    if (showSpinner) this.spinner.show();

    const data: ISaveClientInfoRequest = {
      hostHeaderInfo: RequestHeaderInfo.Instance(),
      businessInfo: this.businessInfo?.transform(this.accountData?.name),
      applicationStage: this.navigationPosition,
      docInfo: (this.documentUploadInfo as DocumentUploadInfo)?.transform(),
      accountInfo: this.accountInfo?.transform(),
      newManagementInfoList: this.managementInfo?.transform(),
      channelsInfo: this.digitalChannels?.transform(),
      final: final,
      verifiedEmail: false,
      updateStatus: state,
    };

    this.api.saveClientInfo(data).subscribe(
      (res) => {
        if (res.hostHeaderInfo.responseCode === AppConstant.SUCCESS_CODE) {
          this.notificationService.showToast(
            `Saved Current Progress`,
            'success-toast',
            5000
          );

          if (showSpinner) this.spinner.hide();
          //if state is exit log user out
          if (state === SAVE_STATE.SAVE_AND_EXIT) {
            this.authService.logout();
            this.navigationService.navigateToLogin();
          }

          if (state === SAVE_STATE.COMPLETE) {
            this.PAGE_STATE = this.PROGRESS.COMPLETE;
          }
        } else {
          this.notificationService.showToast(
            `Failed saving current progress`,
            'success-toast',
            5000
          );
        }
      },
      (error: Error) => {
        this.spinner.hide();

        //display error message
        this.notificationService.showToast(
          `Failed Saving`,
          'success-toast',
          5000
        );
      },

      () => {
        this.spinner.hide();
      }
    );
  }

  getUserData() {
    // this.spinner.show();
    this.api.getClientInfo().subscribe(
      (res) => {
        if (res.hostHeaderInfo.responseCode === AppConstant.SUCCESS_CODE) {
          this.userData = res;
          const unpacked = UserAccountInfoResponse?.unpack(res);
          if (unpacked) {
            this.businessInfo = unpacked?.businessInfo || new BusinessInfo();
            this.accountInfo = unpacked?.accountInfo || new AccountInfo();
            this.managementInfo =
              unpacked?.managementInfo || new ManagementInfo();
            this.digitalChannels =
              unpacked?.channelsInfo || new DigitalChannels();
            this.documentUploadInfo =
              unpacked?.documentUploadInfo || new DocumentUploadInfo();
          }
        } else if (res.hostHeaderInfo.responseCode === 'A03') {
          this.userData = {
            status: 'INCOMPLETE',
          };
        } else {
          this.notificationService.showToast(
            `Failed fetching user data`,
            'success-toast',
            5000
          );
        }
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
      },
      () => {
        this.spinner.hide();
      }
    );
  }

  /**Destroy the subscription on the event bus, this will prevent multiple request */
  ngOnDestroy() {
    if (this._eventBusSub) {
      this._eventBusSub.unsubscribe();
    }
  }

  async uploadFiles(spinner = false, saveState = SAVE_STATE.SAVE) {
    this.spinner.show();
    //filter out the uploaded ones
    const _passFiltered = this.documentUploadInfo.passportPicture.filter(
      (val) => !val.isUploaded && !val.url
    );

    //if there are files to upload - passPORT PICTURE
    if (_passFiltered.length > 0) {
      const _passResponse = await this.uploadService
        .multipleFileUpload(_passFiltered)
        .toPromise();

      if (
        _passResponse &&
        _passResponse.responseCode === AppConstant.SUCCESS_CODE
      ) {
        this.documentUploadInfo.passportPicture =
          this.processUploadedDocuements(
            this.documentUploadInfo.passportPicture,
            _passResponse.fileInfo
          );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Passport Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - SIGNATURE CARD
    const _sigFiltered = this.documentUploadInfo.signatureCard.filter(
      (val) => !val.isUploaded && !val.url
    );

    //if there are files to upload
    if (_sigFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_sigFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.signatureCard = this.processUploadedDocuements(
          this.documentUploadInfo.signatureCard,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Signature Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - MANDATORY CARD
    const _madotoryFiltered = this.documentUploadInfo.mandatorySignature.filter(
      (val) => !val.isUploaded && !val.url
    );

    //if there are files to upload
    if (_madotoryFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_madotoryFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.mandatorySignature =
          this.processUploadedDocuements(
            this.documentUploadInfo.mandatorySignature,
            _response.fileInfo
          );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Mandatory Signature Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - OTHERS FORM
    const _othersFiltered = this.documentUploadInfo.others.filter(
      (val) => !val.isUploaded && !val.url
    );

    //if there are files to upload
    if (_othersFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_othersFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.others = this.processUploadedDocuements(
          this.documentUploadInfo.others,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Other Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - BUSINESS IDS
    const _businessIdsFiltered = this.documentUploadInfo.businessId.filter(
      (val) => !val.isUploaded && !val.url
    );

    //if there are files to upload
    if (_businessIdsFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_businessIdsFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.businessId = this.processUploadedDocuements(
          this.documentUploadInfo.businessId,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Business Ids Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - REGISTERATION IDS
    const _registerationFiltered = this.documentUploadInfo.registration.filter(
      (val) => !val.isUploaded && !val.url
    );
    //if there are files to upload
    if (_registerationFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_registerationFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.registration = this.processUploadedDocuements(
          this.documentUploadInfo.registration,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Registeration Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - BUSINESS ADDRESS IDS
    const _addressFiltered = this.documentUploadInfo.businessAddress.filter(
      (val) => !val.isUploaded && !val.url
    );
    //if there are files to upload
    if (_addressFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_addressFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.businessAddress =
          this.processUploadedDocuements(
            this.documentUploadInfo.businessAddress,
            _response.fileInfo
          );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Business Address Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - RESOLUTION DOCUMENTS
    const _resolutionFiltered = this.documentUploadInfo.resolution.filter(
      (val) => !val.isUploaded && !val.url
    );
    //if there are files to upload
    if (_resolutionFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_resolutionFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.resolution = this.processUploadedDocuements(
          this.documentUploadInfo.resolution,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Resolution Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - FATCA 1
    const _farca1Filtered = this.documentUploadInfo.fatca1.filter(
      (val) => !val.isUploaded && !val.url
    );
    //if there are files to upload
    if (_farca1Filtered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_farca1Filtered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.fatca1 = this.processUploadedDocuements(
          this.documentUploadInfo.fatca1,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Fatca 1 Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - FATCA 2
    const _fatca2Filtered = this.documentUploadInfo.fatca2.filter(
      (val) => !val.isUploaded && !val.url
    );
    //if there are files to upload
    if (_fatca2Filtered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_fatca2Filtered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.fatca2 = this.processUploadedDocuements(
          this.documentUploadInfo.fatca2,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Fatca 2 Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - FATCA 3
    const _fatca3Filtered = this.documentUploadInfo.fatca3.filter(
      (val) => !val.isUploaded && !val.url
    );
    //if there are files to upload
    if (_fatca3Filtered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_fatca3Filtered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.fatca3 = this.processUploadedDocuements(
          this.documentUploadInfo.fatca3,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Fatca 3 Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();
        return;
      }
    }

    //filter out the uploaded ones - LICENSE IDS
    const _licenseFiltered = this.documentUploadInfo.license.filter(
      (val) => !val.isUploaded && !val.url
    );
    //if there are files to upload
    if (_licenseFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_licenseFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.license = this.processUploadedDocuements(
          this.documentUploadInfo.license,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading License Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();

        return;
      }
    }

    //filter out the uploaded ones - PERMIT DOCUMENTS
    const _permitFiltered = this.documentUploadInfo.permit.filter(
      (val) => !val.isUploaded && !val.url
    );
    //if there are files to upload
    if (_permitFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_permitFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.permit = this.processUploadedDocuements(
          this.documentUploadInfo.permit,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Permit Documents, Please try again`,
          'success-toast',
          10000
        );

        this.spinner.hide();

        return;
      }
    }

    //filter out the uploaded ones - PERMIT DOCUMENTS
    const _relatedPartiesFiltered =
      this.documentUploadInfo.relatedParties.filter(
        (val) => !val.isUploaded && !val.url
      );
    //if there are files to upload
    if (_relatedPartiesFiltered.length > 0) {
      const _response = await this.uploadService
        .multipleFileUpload(_relatedPartiesFiltered)
        .toPromise();

      if (_response && _response.responseCode === AppConstant.SUCCESS_CODE) {
        this.documentUploadInfo.relatedParties = this.processUploadedDocuements(
          this.documentUploadInfo.relatedParties,
          _response.fileInfo
        );
      } else {
        this.notificationService.showToast(
          `Failed Uploading Related Parties Documents, Please try again`,
          'success-toast',
          10000
        );

        return;
      }
    }

    //hide
    //save data at this stage
    this.saveCurrentForm(spinner, saveState);
  }

  processUploadedDocuements(files: IPickedFile[], response: FileInfo[]) {
    let newFiles: IPickedFile[] = [];

    //copy all uploaded files into files
    newFiles = files.filter((file) => file.isUploaded && file.url);

    response.map((file) => {
      newFiles.push({
        name: file.fileName,
        file: null,
        url: file.filePath,
        isUploaded: true,
      });
    });

    return newFiles;
  }

  openTermsAndConditionsDialog() {
    const dialogRef = this.dialog.open(TermsAndConditionsDialogComponent, {
      width: '450px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result: { verified: boolean }) => {
      if (result && result.verified) {
        this.submit();
      }
    });
  }
}
