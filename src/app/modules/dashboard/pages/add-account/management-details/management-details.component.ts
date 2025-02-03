import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { COUNTRY_OF_INCORPORATION, IDENTIFICATION_TYPE, INDUSTRIES_LIST, PACKAGES, PROGRESS_STATE, RESIDENCY_TYPE } from 'src/app/shared/constants/app.constants';
import { AdditionalDetails, DirectorInfo, IActivityInputType, IAdditionalDetails, IDirector, ISignitoryDetails, PrincipalDetails, SignatoryDetails } from 'src/app/shared/models/account.model';
import { IManagementInfo, ManagementInfo } from 'src/app/shared/models/management-info.model';
import { APIService } from 'src/app/shared/services/api.service';
import { EventBusService } from 'src/app/shared/services/event-bus.service';
import { TableControllerService } from 'src/app/shared/services/paging-controller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-management-details',
  templateUrl: './management-details.component.html',
  styleUrls: ['./management-details.component.scss']
})
export class AddManagementDetailsComponent implements OnInit {

  RESIDENCY_OPTIONS = RESIDENCY_TYPE
  IDENTIFY_OPTIONS = IDENTIFICATION_TYPE
  COUNTRIES = COUNTRY_OF_INCORPORATION;
  INDUSTRIES = INDUSTRIES_LIST;
  assetUrl = environment.assetsUrl;

  panelOpenState = false;

  PAGE_STATE: PROGRESS_STATE = PROGRESS_STATE.DONE;
  PROGRESS = PROGRESS_STATE;

  principalOfficer: FormGroup;
  accountSignitariesFormGroups: FormGroup[] = [];
  directorsFormGroups: FormGroup[] = [];
  additionalDetailsFormGroups: FormGroup[] = [];

  ACCOUNT_PACKAGES = PACKAGES;


  genderList = ["MALE", "FEMALE"];

  todayDate = new Date();

  @Input() package: PACKAGES = PACKAGES.SOLE_PROPRITOR;


  @Input() managementInfo: IManagementInfo = new ManagementInfo();
  @Output() managementInfoChange = new EventEmitter<IManagementInfo>();


  @Input() isManagementDetailsValid = false;
  @Output() isManagementDetailsValidChange = new EventEmitter<boolean>();


  //holds the directors status clikced
  directorStatusList: IActivityInputType[][] = []

  constructor(
    private pager: TableControllerService,
    private api: APIService,
    private _formBuilder: UntypedFormBuilder,
  ) {


    this.principalOfficer = this._formBuilder.group({
      surname: [this.managementInfo.principal.surname || "", Validators.required],
      firstname: new FormControl({ value: this.managementInfo.principal.firstname || "", disabled: false }, [Validators.required]), //
      othernames: new FormControl({ value: this.managementInfo.principal.othernames || "", disabled: false }, []),
      idNumber: new FormControl({ value: this.managementInfo.principal.idNumber, disabled: false }, [Validators.required]),
      gender: new FormControl({ value: this.managementInfo.principal.gender, disabled: false }, [Validators.required]),
      dateOfBirth: new FormControl<Date | null>({ value: this.managementInfo.principal.dateOfBirth as Date, disabled: false }, [Validators.required]),
      idIssueDate: new FormControl<Date | null>({ value: this.managementInfo.principal.idIssueDate as Date, disabled: false }, [Validators.required]),
      idExpiryDate: new FormControl<Date | null>({ value: this.managementInfo.principal.idExpiryDate as Date, disabled: false }, [Validators.required]),
      mothersMaidenName: new FormControl({ value: this.managementInfo.principal.mothersMaidenName || "", disabled: false }, []),
      meansOfIdentification: new FormControl({ value: this.managementInfo.principal.meansOfIdentification, disabled: false }, [Validators.required]),
      occupation: new FormControl({ value: this.managementInfo.principal.occupation || "", disabled: false }, [Validators.required]),
      jobTitle: new FormControl({ value: this.managementInfo.principal.jobTitle || "", disabled: false }, [Validators.required]),
      residentialAddress: new FormControl({ value: this.managementInfo.principal.residentialAddress || "", disabled: false }, [Validators.required]),
      mmda: new FormControl({ value: this.managementInfo.principal.mmda || "", disabled: false }, []),
      region: new FormControl({ value: this.managementInfo.principal.region || "", disabled: false }, []),
      email: new FormControl({ value: this.managementInfo.principal.email || "", disabled: false }, [Validators.required]),
      residentialPermit: new FormControl({ value: this.managementInfo.principal.residentialPermit || "", disabled: false }, []),
      city: new FormControl({ value: this.managementInfo.principal.city || "", disabled: false }, [Validators.minLength(2)]),
      primaryPhoneNumber: new FormControl({ value: this.managementInfo.principal.primaryPhoneNumber || "", disabled: false }, [Validators.required]),
      secondaryPhoneNumber: new FormControl({ value: this.managementInfo.principal.secondaryPhoneNumber || "", disabled: false }, [Validators.minLength(2)]),
      nearestLandmark: new FormControl({ value: this.managementInfo.principal.nearestLandmark || "", disabled: false }, [Validators.required]),
    });

    
    //reset all form fields
    this.principalOfficer.reset()
    for(const man of this.accountSignitariesFormGroups){
        man.reset()
    }

    for(const man of this.directorsFormGroups){
      man.reset()
  }

  for(const man of this.additionalDetailsFormGroups){
    man.reset()
  }
  }

  ngAfterViewChecked() {
    this.isManagementDetailsValid = this.validateMangementInfo();
    this.isManagementDetailsValidChange.emit(this.isManagementDetailsValid);

  }


  ngOnInit(): void {
    // theres been conditions when the management info principal turns null;
    //validate them here before continuing
    if (!this.managementInfo) this.managementInfo = new ManagementInfo()

    //check pricipal
    if (!this.managementInfo.signitory) this.managementInfo.signitory = [];
    if (!this.managementInfo.principal) this.managementInfo.principal = new PrincipalDetails();
    if (!this.managementInfo.directors) this.managementInfo.directors = [];

    //@ts-ignore
    let newManagementDetail: IManagementInfo = new ManagementInfo();

    Object.assign(newManagementDetail, this.managementInfo)

    this.managementInfo.signitory = [];
    this.managementInfo.directors = [];
    this.managementInfo.additionalDetails = [];

    if (newManagementDetail.signitory.length > 0) {
      for (const sig of newManagementDetail.signitory) {
        this.addAccountSignatory(sig)
      }
    }

    //update directors
    if (newManagementDetail.directors.length > 0) {
      for (const dir of newManagementDetail.directors) {
        this.addDirector(dir)

        //push a director status activity
        this.directorStatusList.push(this.createStatus())
      }
    }

    //update additional Details
    if (newManagementDetail.additionalDetails.length > 0) {
      for (const addDetails of newManagementDetail.additionalDetails) {
        this.addAdditionalDetails(addDetails)
      }
    }

    this.convertAccountFunctionalityActivities()
  }

  getPrincipalSelectedCountry(country: { name: string, code: string }) {
    this.managementInfo.principal.nationality = country.name;
  }

  getSignatorySelectedCountry(index: number, country: { name: string, code: string }) {
    this.managementInfo.signitory[index].nationality = country.name;
  }


  getDirectorSelectedCountry(index: number, country: { name: string, code: string }) {
    this.managementInfo.directors[index].nationality = country.name;
  }



  removeAccountSignatory(index: number) {
    this.accountSignitariesFormGroups = this.accountSignitariesFormGroups.filter((elem, position) => position != index);
    this.managementInfo.signitory = this.managementInfo.signitory.filter((elem, position) => position != index);
  }

  removeDirector(index: number) {
    this.directorsFormGroups = this.directorsFormGroups.filter((elem, position) => position != index);
    this.managementInfo.directors = this.managementInfo.directors.filter((elem, position) => position != index);
  }

  removeAdditionalDetails(index: number) {
    this.additionalDetailsFormGroups = this.additionalDetailsFormGroups.filter((elem, position) => position != index)
    this.managementInfo.additionalDetails = this.managementInfo.additionalDetails.filter((elem, position) => position != index)
  }


  addDirector(directorInfo: IDirector = new DirectorInfo()) {

    const director = this._formBuilder.group({
      surname: [directorInfo.surname, Validators.required],
      firstname: new FormControl({ value: directorInfo.firstname, disabled: false }, [Validators.required]), //
      othernames: new FormControl({ value: directorInfo.othernames || "", disabled: false }, []),
      dateOfBirth: new FormControl<Date | null>({ value: directorInfo.dateOfBirth as Date, disabled: false }, [Validators.required]),
      idNumber: new FormControl({ value: directorInfo.idNumber, disabled: false }, [Validators.required]),
      gender: new FormControl({ value: directorInfo.gender, disabled: false }, [Validators.required]),
      idIssueDate: new FormControl<Date | null>({ value: directorInfo.idIssueDate as Date, disabled: false }, [Validators.required]),
      idExpiryDate: new FormControl<Date | null>({ value: directorInfo.idExpiryDate as Date, disabled: false }, [Validators.required]),
      mothersMaidenName: new FormControl({ value: directorInfo.mothersMaidenName, disabled: false }, []),
      meansOfIdentification: new FormControl({ value: directorInfo.meansOfIdentification, disabled: false }, [Validators.required]),
      occupation: new FormControl({ value: directorInfo.occupation, disabled: false }, [Validators.required]),
      jobTitle: new FormControl({ value: directorInfo.jobTitle, disabled: false }, [Validators.required]),
      residentialAddress: new FormControl({ value: directorInfo.residentialAddress, disabled: false }, [Validators.required]),
      mmda: new FormControl({ value: directorInfo.mmda, disabled: false }, []),
      region: new FormControl({ value: directorInfo.region, disabled: false }, []),
      email: new FormControl({ value: directorInfo.email, disabled: false }, [Validators.required]),
      residentialPermit: new FormControl({ value: directorInfo.residentialPermit, disabled: false }, []),
      city: new FormControl({ value: directorInfo.city, disabled: false }, [Validators.minLength(2)]),
      primaryPhoneNumber: new FormControl({ value: directorInfo.primaryPhoneNumber, disabled: false }, [Validators.required]),
      secondaryPhoneNumber: new FormControl({ value: directorInfo.secondaryPhoneNumber, disabled: false }, [Validators.minLength(2)]),
      nearestLandmark: new FormControl({ value: directorInfo.nearestLandmark, disabled: false }, [Validators.required]),
    //  STATICS FOR 
    chairman: new FormControl({ value: false, disabled: false }, [Validators.required]),
    director: new FormControl({ value: false, disabled: false }, [Validators.required]),
    executive: new FormControl({ value: false, disabled: false }, [Validators.required]),
    officer: new FormControl({ value: false, disabled: false }, [Validators.required]),
    other: new FormControl({ value: false, disabled: false }, [Validators.required]),
    });

    this.directorsFormGroups.push(director);
    this.managementInfo.directors.push(directorInfo);

    //push a director into the directors
    this.directorStatusList.push(this.createStatus())
  }

  addAccountSignatory(signatoryInfo: ISignitoryDetails = new SignatoryDetails()) {
    const signatory = this._formBuilder.group({
      surname: [signatoryInfo.surname, Validators.required],
      firstname: new FormControl({ value: signatoryInfo.firstname, disabled: false }, [Validators.required]), //
      othernames: new FormControl({ value: signatoryInfo.othernames || "", disabled: false }, []),
      dateOfBirth: new FormControl<Date | null>({ value: (signatoryInfo.dateOfBirth as Date), disabled: false }, [Validators.required]),
      idNumber: new FormControl({ value: signatoryInfo.idNumber, disabled: false }, [Validators.required]),
      gender: new FormControl({ value: signatoryInfo.gender, disabled: false }, [Validators.required]),
      idIssueDate: new FormControl<Date | null>({ value: (signatoryInfo.idIssueDate) as Date, disabled: false }, [Validators.required]),
      idExpiryDate: new FormControl<Date | null>({ value: signatoryInfo.idExpiryDate as Date, disabled: false }, [Validators.required]),
      mothersMaidenName: new FormControl({ value: signatoryInfo.mothersMaidenName, disabled: false }, []),
      meansOfIdentification: new FormControl({ value: signatoryInfo.meansOfIdentification, disabled: false }, [Validators.required]),
      occupation: new FormControl({ value: signatoryInfo.occupation, disabled: false }, [Validators.required]),
      jobTitle: new FormControl({ value: signatoryInfo.jobTitle, disabled: false }, [Validators.required]),
      residentialAddress: new FormControl({ value: signatoryInfo.residentialAddress, disabled: false }, [Validators.required]),
      mmda: new FormControl({ value: signatoryInfo.mmda, disabled: false }, []),
      region: new FormControl({ value: signatoryInfo.region, disabled: false }, []),
      email: new FormControl({ value: signatoryInfo.email, disabled: false }, [Validators.required]),
      residentialPermit: new FormControl({ value: signatoryInfo.residentialPermit, disabled: false }, []),
      city: new FormControl({ value: signatoryInfo.city, disabled: false }, [Validators.minLength(2)]),
      primaryPhoneNumber: new FormControl({ value: signatoryInfo.primaryPhoneNumber, disabled: false }, [Validators.required]),
      secondaryPhoneNumber: new FormControl({ value: signatoryInfo.secondaryPhoneNumber, disabled: false }, [Validators.minLength(2)]),
      nearestLandmark: new FormControl({ value: signatoryInfo.nearestLandmark, disabled: false }, [Validators.required]),
      classOfSignatory: new FormControl({ value: signatoryInfo.classOfSignatory, disabled: false }, [Validators.required]),
    });

    this.accountSignitariesFormGroups.push(signatory)
    this.managementInfo.signitory.push(signatoryInfo)
  }

  addAdditionalDetails(additionalInfo: IAdditionalDetails = new AdditionalDetails()) {

    this.additionalDetailsFormGroups.push(
      this._formBuilder.group({
        nameOfAffiliatedCompany: new FormControl({ value: additionalInfo.nameOfAffiliatedCompany || "", disabled: false }, [Validators.required]),
        fullname: new FormControl({ value: additionalInfo.fullname || "", disabled: false }, [Validators.required]),
        percentageHolding: new FormControl({ value: additionalInfo.percentageHolding || "", disabled: false }, [Validators.required]),
        email: new FormControl({ value: additionalInfo.email || "", disabled: false }, [Validators.required]),
        address: new FormControl({ value: additionalInfo.address || "", disabled: false }, [Validators.required]),
        status: new FormControl({ value: additionalInfo.status || "", disabled: false }, [Validators.required]),
        registrationCertificate: new FormControl({ value: additionalInfo.registrationCertificate || "", disabled: false }, [Validators.required]),
        mobileNumber: new FormControl({ value: additionalInfo.mobileNumber || "", disabled: false }, [Validators.required]),
        countryOfIncorporation: new FormControl({ value: additionalInfo.countryOfIncoporation || "", disabled: false }, [  ]),
        nationality: new FormControl({ value: additionalInfo.nationality || "", disabled: false }, [  ]),
        beneficiaries: new FormControl({ value: additionalInfo.beneficiaries || "", disabled: false }, []),
      })
    )

    this.managementInfo.additionalDetails.push(additionalInfo)
  }


  getAddtionalDetailsCountryOfIncorporation(index: number, country: { name: string, code: string }) {

    this.managementInfo.additionalDetails[index].countryOfIncoporation = country.name;
  }


  getAddtionalDetailsCountry(index: number, country: { name: string, code: string }) {

    this.managementInfo.additionalDetails[index].nationality = country.name;
    // console.log(this.managementInfo.additionalDetails[index] )

  }


  validateMangementInfo() {
    let valid = true;


    if(this.accountSignitariesFormGroups.length <= 0) return false;
    if(this.directorsFormGroups.length <= 0) return false;
    if(this.additionalDetailsFormGroups.length <= 0) return false;
    
    //for sole P, DETAILS OF DIRECTORS / EXECUTIVES / TRUSTEES ETC.. INFO & SHAREHOLDER'S INFORMATION is not required
    // if(this.package !== this.ACCOUNT_PACKAGES.SOLE_PROPRITOR){
     
    // } 


    for (const _form of this.accountSignitariesFormGroups) {
      valid = valid && _form.valid;
      console.log("SIG", _form.valid)
    }

    for (const _form of this.directorsFormGroups) {
      valid = valid && _form.valid;
    }

    for (const _form of this.additionalDetailsFormGroups) {
      valid = valid && _form.valid;
    }

    return valid && this.principalOfficer.valid;

  }



  addDirectorStatus(index: number, item: IActivityInputType, $event: MatCheckboxChange) {

    if ($event.checked) {
      //find and tick as checked
      this.directorStatusList[index].map((val, _) => {
        if (val.id === item.id) {
          val.checked = true
        }
      })

    } else {
      //remove from the checked list
      this.directorStatusList[index].map((val, _) => {
        if (val.id === item.id) {
          val.checked = false
        }
      })
    }

    const filtered = this.directorStatusList[index].filter((res) => res.checked);

    this.managementInfo.directors[index].statusAsDirector = [];
    for (const _data of filtered) {
      this.managementInfo.directors[index].statusAsDirector.push(_data.id)
    }

   }



  convertAccountFunctionalityActivities() {

    if (!this.managementInfo.directors) return;

    this.managementInfo.directors.map((director, index) => {
      const existingIds = director.statusAsDirector || [];

      for (const item of this.directorStatusList[index]) {

        let checked = false;
        if (existingIds.includes(item.id)) {
          item.checked = true
        };

      }
    })

  }


  createStatus(){
    return [
      {
        id: "Chairman",
        name: "Chairman",
        formName : "chairman",
        checked: false
      },
      {
        id: "Managing Director / Chief Executive Officer",
        name: "Managing Director / Chief Executive Officer",
        checked: false,
        formName : "director",
      },
      {
        id: "Non-Executive Director",
        name: "Non-Executive Director",
        checked: false,
        formName : "executive",

      },
      {
        id: "Chief Financial Officer",
        name: "Chief Financial Officer",
        checked: false,
        formName : "officer",

      },
      {
        id: "Other",
        name: "Other",
        checked: false,
        formName : "other",
      },
    ]
  }


}
