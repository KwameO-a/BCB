import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { PROGRESS_STATE, SIGNATORY_TYPES_LIST } from 'src/app/shared/constants/app.constants';
import { DigitalChannels, IActivityInputType, IAuthorizer, IBankingUser, IDigitalChannels } from 'src/app/shared/models/account.model';
import { ILink } from 'src/app/shared/models/link.model';
import { APIService } from 'src/app/shared/services/api.service';
import { TableControllerService } from 'src/app/shared/services/paging-controller.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-digital-channels',
  templateUrl: './digital-channels.component.html',
  styleUrls: ['./digital-channels.component.scss']
})
export class AddDigitalChannelsComponent implements OnInit {

  assetUrl = environment.assetsUrl;


  authorisersFormGroups : FormGroup[] = [];
  capturersFormGroups : FormGroup[] = [];
  ebankingUsersFormGroups : FormGroup[] = [];

  SIGNATORY_TYPES = SIGNATORY_TYPES_LIST;
  PAGE_STATE: PROGRESS_STATE = PROGRESS_STATE.DONE;
  PROGRESS = PROGRESS_STATE;

  accountFunctionalityActivities : IActivityInputType[] = [
    {
      id : "Viewing Balances and Printing Statements",
      name : "Viewing Balances and Printing Statements",
      checked : false
    },
    {
      id : "Making Inter Account Transfer",
      name : "Making Inter Account Transfer",
      checked : false
    },
    {
      id : "Making Third Party Payments (payments to other accounts)",
      name : "Making Third Party Payments (payments to other accounts)",
      checked : false
    },
  ];




  accountChannelsActivities : IActivityInputType[] = [
    {
      id : "Business Online",
      name : "Business Online",
      checked : false
    },
    {
      id : "Enterprise Online",
      name : "Enterprise Online",
      checked : false
    },
    {
      id : "Point of Sales (POS)",
      name : "Point of Sales (POS)",
      checked : false
    },
    {
      id : "Debit Card",
      name : "Debit Card",
      checked : false
    },
    {
      id : "MoMo Linkage",
      name : "MoMo Linkage",
      checked : false
    },
  ];


  
  @Input() digitalChannels : IDigitalChannels = new DigitalChannels();
  @Output() digitalChannelsChange  = new EventEmitter<IDigitalChannels>();

  @Input() isDigitalChannelsValid = false;
  @Output() isDigitalChannelsValidChange = new EventEmitter<boolean>();
  

  constructor(
    private pager: TableControllerService,
    private api: APIService,
    private _formBuilder: UntypedFormBuilder,

  ) {

   

  }

  
  ngAfterViewChecked() {
    this.isDigitalChannelsValid = this.validateDigitalChannelsInfo();
    this.isDigitalChannelsValidChange.emit(this.isDigitalChannelsValid)
  }

  

  ngOnInit(): void {
    this.unpackChannelsData()

  }
  
  addNewAuthorisers(authorizer : IAuthorizer  = {name : "", signatoryType : ""}){
    this.authorisersFormGroups.push(
      this._formBuilder.group({ 
        fullname: [authorizer.name, Validators.required],
        signatoryType: new FormControl({value: authorizer.signatoryType, disabled: false},[Validators.required]), //
      })
    );

    this.digitalChannels.autorisers.push({
      name : authorizer.name,
      signatoryType : authorizer.signatoryType
    })
  }

  addNewCapturer(capturer = ""){
    this.capturersFormGroups.push(
      this._formBuilder.group({ 
        name: [capturer, Validators.required],
      })
    );
    this.digitalChannels.capturers.push(capturer)
  }

  addNewEBankUser(ebankingUser : IBankingUser = {contact : "", fullName : "", email : ""}){
    this.ebankingUsersFormGroups.push(
      this._formBuilder.group({ 
        fullName: [ebankingUser.fullName, Validators.required],
        contact: [ebankingUser.contact, Validators.required],
        email: [ebankingUser.email, Validators.required],
      })
    );

    this.digitalChannels.bankUserData.push(ebankingUser)
  }

  addFunctionalityActivity(item : IActivityInputType, $event : MatCheckboxChange){

    if($event.checked){
      //find and tick as checked
      this.accountFunctionalityActivities.map((val, _)=> {
       if( val.id === item.id){
          val.checked = true
       }
      })

    }else{
      //remove from the checked list
      this.accountFunctionalityActivities.map((val, _)=> {
        if( val.id === item.id){
           val.checked = false
        }
        })
    }

    const filtered = this.accountFunctionalityActivities.filter((res)=> res.checked);

    this.digitalChannels.functionality = [];
    for(const _data of filtered){
      this.digitalChannels.functionality.push(_data.id)
    }
  }

  addChannelActivity(item : IActivityInputType, $event : MatCheckboxChange){

    if($event.checked){
      //find and tick as checked
      this.accountChannelsActivities.map((val, _)=> {
       if( val.id === item.id){
          val.checked = true
       }
      })

    }else{
      //remove from the checked list
      this.accountChannelsActivities.map((val, _)=> {
        if( val.id === item.id){
           val.checked = false
        }
        })
    }

    const filtered = this.accountChannelsActivities.filter((res)=> res.checked);

    this.digitalChannels.channel = [];
    for(const _data of filtered){
      this.digitalChannels.channel.push(_data.id)
    }
  }


  removeAuthoriser(index : number){
    this.authorisersFormGroups = this.authorisersFormGroups.filter((val, position)=> position != index)
    this.digitalChannels.autorisers = this.digitalChannels.autorisers.filter((val, position)=> position != index)
  }

  removeCapturer(index : number){
    this.digitalChannels.capturers = this.digitalChannels.capturers.filter((val, position)=> position != index)
    this.capturersFormGroups = this.capturersFormGroups.filter((val, position)=> position != index)
  }


  removeEBankingUser(index : number){
    this.digitalChannels.bankUserData = this.digitalChannels.bankUserData.filter((val, position)=> position != index)
    this.ebankingUsersFormGroups = this.ebankingUsersFormGroups.filter((val, position)=> position != index)
  }


  unpackChannelsData(){


    //check data
    if(!this.digitalChannels.autorisers) this.digitalChannels.autorisers = [];
    if(!this.digitalChannels.capturers) this.digitalChannels.capturers = [];
    if(!this.digitalChannels.bankUserData) this.digitalChannels.bankUserData = [];
    

    const _tempEbankingUsers = Array.from(this.digitalChannels?.bankUserData || [])
    const _capturers = Array.from(this.digitalChannels.capturers)
    const _tempAutorisers = Array.from(this.digitalChannels.autorisers)

    //reset the current to empty arrays and populate
     this.digitalChannels.autorisers = [];
     this.digitalChannels.capturers = [];
     this.digitalChannels.bankUserData = [];

    for(const item of _tempAutorisers){
      this.addNewAuthorisers(item)
    }

    for(const item of _capturers){
      this.addNewCapturer(item)
    }
    for(const item of _tempEbankingUsers){
      this.addNewEBankUser(item)
    }


    //convert account functionality activities
    this.convertAccountFunctionalityActivities()
    this.convertAccountChannelActivities()
  }


  convertAccountFunctionalityActivities(){

    const existingIds = this.digitalChannels.functionality || [];

    for(const item of this.accountFunctionalityActivities){
    
      let checked = false;
      if(existingIds.includes(item.id)){
       item.checked = true
      };
      
     
    }
  }

  convertAccountChannelActivities(){

    const existingIds = this.digitalChannels.channel || [];

    for(const item of this.accountChannelsActivities){
    
      let checked = false;
      if(existingIds.includes(item.id)){
       item.checked = true
      };
      
     
    }
  }

  validateDigitalChannelsInfo(){

    if(this.authorisersFormGroups.length <1 && this.capturersFormGroups.length < 1 && this.ebankingUsersFormGroups.length < 1) return false;

    //check if they are not valid return 
    
    return true;
  }
}
