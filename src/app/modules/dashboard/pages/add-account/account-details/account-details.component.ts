import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DateAdapter } from '@angular/material/core';
import {
  ACCOUNT_REASONS_LIST,
  SOURCE_OF_FUNDS_LIST,
  PROGRESS_STATE,
  CONTACT_FREQUENCY_LIST,
  CONTACT_MODE_LIST,
  RELATIONSHIP_MANAGERS_LIST,
  AppConstant,
  ACTIVITY_ON_ACCOUNT,
} from 'src/app/shared/constants/app.constants';
import {
  AccountInfo,
  IAccountInfo,
  IActivityInputType,
  IRelationshipManager,
} from 'src/app/shared/models/account.model';
import { IBranch } from 'src/app/shared/models/branches.model';
import { APIService } from 'src/app/shared/services/api.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { TableControllerService } from 'src/app/shared/services/paging-controller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
})
export class AddAccountDetailsComponent implements OnInit {
  assetUrl = environment.assetsUrl;

  accountTypeActivities: IActivityInputType[] = [
    {
      id: 'CURRENT_ACCOUNT',
      name: 'CURRENT ACCOUNT',
      checked: false,
    },
    {
      id: 'SAVINGS_ACCOUNT',
      name: 'SAVINGS ACCOUNT',
      checked: false,
    },
  ];
  PAGE_STATE: PROGRESS_STATE = PROGRESS_STATE.DONE;
  PROGRESS = PROGRESS_STATE;

  REASONS_FOR_ACCOUNT = ACCOUNT_REASONS_LIST;
  SOURCE_OF_FUNDS = SOURCE_OF_FUNDS_LIST;
  CONTACT_FREQUENCY = CONTACT_FREQUENCY_LIST;
  CONTACT_MODE = CONTACT_MODE_LIST;
  RELATIONSHIP_MANAGERS: IRelationshipManager[] = [];
  ACTIVITY_ON_ACCOUNT_LIST = ACTIVITY_ON_ACCOUNT;

  availableBranches: IBranch[] = [];
  availableBranche = '';

  //@ts-ignore
  accountInfoForm: FormGroup;

  @Input() accountInfo = new AccountInfo();
  @Output() accountInfoChange = new EventEmitter<IAccountInfo>();

  @Input() isAccountDetailsValid = false;
  @Output() isAccountDetailsValidChange = new EventEmitter<boolean>();

  //manage the state of the checked items here and send back string
  accountActivities: IActivityInputType[] = [];

  constructor(
    private pager: TableControllerService,
    private api: APIService,
    private _formBuilder: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.PAGE_STATE = this.PROGRESS.LOADING;

    const _selected = this.RELATIONSHIP_MANAGERS.find(
      (rm) => rm.staffId === this.accountInfo.rmNo
    );

    if (_selected) {
      this.accountInfo.rmNo = _selected.staffId;
      this.accountInfo.rm = _selected.name;
    }

    this.accountInfoForm = this._formBuilder.group({
      businessType: [this.accountInfo.businessType, Validators.required],
      rm: [this.accountInfo.rmNo, Validators.required],
      freqPref: new FormControl({
        value: this.accountInfo.freqPref,
        disabled: false,
      }),
      mode: new FormControl(
        { value: this.accountInfo.mode || '', disabled: false },
        [Validators.required, Validators.minLength(1)]
      ),
      fundSource: new FormControl(
        { value: this.accountInfo.fundSource || '', disabled: false },
        [Validators.required, Validators.minLength(1)]
      ),
      reason: new FormControl(
        { value: this.accountInfo.reason || '', disabled: false },
        [Validators.required]
      ),
      phone: new FormControl(
        { value: this.accountInfo.mobileNumber || '', disabled: false },
        []
      ),
      email: new FormControl(
        { value: this.accountInfo.email || '', disabled: false },
        []
      ),
      preferredBranch: new FormControl(
        { value: this.accountInfo.preferredBranch || '', disabled: false },
        []
      ),
      keyContactPerson: new FormControl(
        { value: this.accountInfo.keyContPerson || '', disabled: false },
        [Validators.required, Validators.minLength(9)]
      ),
      bdcCode: new FormControl(
        { value: this.accountInfo.bdcCode || '', disabled: false },
        []
      ),

      //ADD STATICS TO ALLOW THE PAGE TO LOAD
      CASH_DEPOSITS: new FormControl({ value: '', disabled: false }, []),
      DEBIT_ORDERS: new FormControl({ value: '', disabled: false }, []),
      ELECTRONIC_PAYMENTS: new FormControl({ value: '', disabled: false }, []),
      DIGITAL_PAYMENTS: new FormControl({ value: '', disabled: false }, []),
      CHEQUE_PAYMENTS: new FormControl({ value: '', disabled: false }, []),
      //CURRENCY just to prevent it from breaking
      CURRENCY: new FormControl({ value: true, disabled: true }, []),
      SAVINGS: new FormControl({ value: false, disabled: false }, []),
      CURRENT: new FormControl({ value: false, disabled: false }, []),
      CURRENT_ACCOUNT: new FormControl({ value: false, disabled: false }, []),
      SAVINGS_ACCOUNT: new FormControl({ value: false, disabled: false }, []),
      SMS_ALERT: new FormControl({ value: false, disabled: false }, []),
      EMAIL_ALERT: new FormControl({ value: false, disabled: false }, []),
    });

    this.api.getBranches().subscribe(
      (response) => {
        if (response.hostHeaderInfo.responseCode === AppConstant.SUCCESS_CODE) {
          this.availableBranches = response.fiBranchInfo;
          this.PAGE_STATE = this.PROGRESS.DONE;
        }
      },
      (err) => {
        this.PAGE_STATE = this.PROGRESS.DONE;
        this.notificationService.showToast(
          `Failed fetching branches, please try again`,
          'success-toast',
          10000
        );
      },
      () => {
        this.PAGE_STATE = this.PROGRESS.DONE;
      }
    );
  }

  rmChange(rm: IRelationshipManager) {
    const _selected = this.RELATIONSHIP_MANAGERS.find(
      (data) => data.staffId === rm.staffId
    );

    if (_selected) {
      this.accountInfo.rmNo = _selected.staffId;
      this.accountInfo.rm = _selected.name;
    }
  }

  ngAfterViewChecked() {
    //combine email & phone if ticked and shared
    let selections = '';
    if (this.accountInfo.emailAlert)
      selections = this.accountInfo.email + ',' + selections;

    if (this.accountInfo.smsAlert)
      selections = this.accountInfo.mobileNumber + ',' + selections;

    this.accountInfo.alertSelection = selections;

    this.isAccountDetailsValid = this.accountInfoForm.valid;
    this.isAccountDetailsValidChange.emit(this.accountInfoForm.valid);
  }

  ngOnInit(): void {
    this.getRms();
    this.convertAccountActivities();
    this.convertAccountTypeActivities();
  }

  getRms() {
    this.api.getRelationshipManagers().subscribe(
      (res) => {
        this.RELATIONSHIP_MANAGERS = res.rmsObjList;
      },

      (err) => {
        this.notificationService.showToast(
          `Failed fetching rms, please try again`,
          'success-toast',
          10000
        );
      }
    );
  }

  switchAlertCheckState(type: string, checked: boolean) {
    if (type === 'SMS') {
      this.accountInfo.smsAlert = checked;
    } else if (type === 'EMAIL') {
      this.accountInfo.emailAlert = checked;
    }
  }

  addActivity(item: { id: string; name: string }, $event: MatCheckboxChange) {
    if ($event.checked) {
      //find and tick as checked
      this.accountActivities.map((val, _) => {
        if (val.id === item.id) {
          val.checked = true;
        }
      });
    } else {
      //remove from the checked list
      this.accountActivities.map((val, _) => {
        if (val.id === item.id) {
          val.checked = false;
        }
      });
    }

    const filtered = this.accountActivities.filter((res) => res.checked);
    let res = '';
    for (const _data of filtered) {
      res = _data.id + ',' + res;
    }

    this.accountInfo.activityType = filtered.map((res) => res.id);
  }

  addAccountType(
    item: { id: string; name: string },
    $event: MatCheckboxChange
  ) {
    if ($event.checked) {
      //find and tick as checked
      this.accountTypeActivities.map((val, _) => {
        if (val.id === item.id) {
          val.checked = true;
        }
      });
    } else {
      //remove from the checked list
      this.accountTypeActivities.map((val, _) => {
        if (val.id === item.id) {
          val.checked = false;
        }
      });
    }

    const filtered = this.accountTypeActivities.filter((res) => res.checked);

    this.accountInfo.accountSelection = [];
    for (const _data of filtered) {
      this.accountInfo.accountSelection.push(_data.id);
    }
  }

  convertAccountActivities() {
    const existingIds = this.accountInfo.activityType;

    for (const item of ACTIVITY_ON_ACCOUNT) {
      let checked = false;
      if (existingIds.includes(item.id)) {
        checked = true;
      }

      this.accountActivities.push({
        name: item.name,
        id: item.id,
        checked: checked,
      });
    }
  }

  convertAccountTypeActivities() {
    const existingIds = this.accountInfo.accountSelection || [];

    for (const item of this.accountTypeActivities) {
      let checked = false;
      if (existingIds.includes(item.id)) {
        item.checked = true;
      }
    }
  }

  convertCurrrency() {
    //If we have multiple instances of CURRENCIES, USE THIS
  }

  prefferedBranchSelected(branch: IBranch) {
    this.accountInfo.preferredBranch = branch.branch;
  }

  currentAccountSelected($event: MatCheckboxChange) {}

  checkOtherPresent() {
    if (this.accountInfo.fundSource.includes('Other')) {
      return true;
    }
    return false;
  }
}
