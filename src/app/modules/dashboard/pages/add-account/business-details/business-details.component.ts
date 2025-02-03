import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  COUNTRY_OF_INCORPORATION, INDUSTRIES_LIST, PACKAGES, PACKAGE_TYPES, PROGRESS_STATE, RESIDENCY_TYPE } from 'src/app/shared/constants/app.constants';
import { BusinessInfo, IBusinessInfo } from 'src/app/shared/models/account.model';
import { APIService } from 'src/app/shared/services/api.service';
import { TableControllerService } from 'src/app/shared/services/paging-controller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.scss']
})
export class AddBusinessDetailsComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  RESIDENCY_OPTIONS = RESIDENCY_TYPE
  COUNTRIES = COUNTRY_OF_INCORPORATION;
  INDUSTRIES = INDUSTRIES_LIST;
  
  PAGE_STATE: PROGRESS_STATE = PROGRESS_STATE.DONE;
  PROGRESS = PROGRESS_STATE;

  @Input() package : PACKAGES = PACKAGES.SOLE_PROPRITOR;
  @Input() businessInfo : IBusinessInfo = new BusinessInfo();
  @Output() businessInfoChange  = new EventEmitter();

  //@ts-ignore
  businessDetails: FormGroup;

  @Input() isBusinessDetailsValid = false;
  @Output() isBusinessDetailsValidChange = new EventEmitter<boolean>();
  
  ACCOUNT_PACKAGES = PACKAGES;

  todayDate = new Date();

  constructor(
    private pager: TableControllerService,
    private api: APIService,
    private _formBuilder: UntypedFormBuilder,

  ) {

    //for sole p & NGOs
    // - packageName === 0 principalShareholders
    // packageName === 0 || packageName === 4 -- affiliatedCompany
    // tin, set validators to 
    this.businessDetails =  this._formBuilder.group({ 
      residency: [  this.businessInfo.residency, Validators.required],
      sector: [ this.businessInfo.sector, Validators.required],
      country: new FormControl({value: this.businessInfo.country, disabled: false},[]), //
      registrationNo: new FormControl({value: this.businessInfo.registrationNo || "", disabled : false }, [Validators.required,]),
      regDate: new FormControl<Date | null>({value: this.businessInfo.regDate, disabled : false }, [Validators.required]),
      registeredName: new FormControl({value: this.businessInfo.registeredName || "", disabled : false }, [ Validators.required]),
      tradeName: new FormControl({value: this.businessInfo.tradeName|| "", disabled : false }, [  Validators.required]),
      tin: new FormControl({value: this.businessInfo.tin|| "", disabled : false }, [  Validators.required]),
      physicalAddress: new FormControl({value: this.businessInfo.physicalAddress|| "", disabled : false }, [  ]),
      postalAddress: new FormControl({value: this.businessInfo.postalAddress|| "", disabled : false }, [  ]),
      annualTurnover: new FormControl({value: this.businessInfo.annualTurnover|| "", disabled : false }, [ Validators.required]),
      telephone: new FormControl({value: this.businessInfo.telephone|| "", disabled : false }, [  Validators.required]),
      additionalDetails: new FormControl({value: this.businessInfo.additionalDetails|| "", disabled : false }, [  ]),
      principalShareholders: new FormControl({value: this.businessInfo.physicalAddress|| "", disabled : false }, [  Validators.minLength(2)]),
      affiliatedCompany: new FormControl({value: this.businessInfo.affiliatedCompany|| "", disabled : false }, [  Validators.minLength(2)]),
    });

  }

  ngAfterViewChecked() {
    this.isBusinessDetailsValid = this.businessDetails.valid;
    this.isBusinessDetailsValidChange.emit(this.businessDetails.valid)
  }   


  ngOnInit(): void { }

  getSelectedCountry(country : {id : number, name : string}){
    this.businessInfo.country = country.name;
    this.businessDetails.get('country')?.setValue(country.name)
  }

  getSelectedIndustry(industry : {id : number, name : string}){
    this.businessInfo.sector = industry.name;
    this.businessDetails.get('sector')?.setValue(industry.name)
  }

}
