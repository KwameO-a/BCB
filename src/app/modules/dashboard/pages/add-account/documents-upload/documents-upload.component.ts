import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DownloadFilesDialogComponent } from 'src/app/modules/dashboard/components/download-files-dialog/download-files-dialog.component';
import { PROGRESS_STATE } from 'src/app/shared/constants/app.constants';
import { DocumentUploadInfo, IDocumentUploadSelectInfo, IPickedFile } from 'src/app/shared/models/account.model';
import { APIService } from 'src/app/shared/services/api.service';
import { TableControllerService } from 'src/app/shared/services/paging-controller.service';
import { environment } from 'src/environments/environment';


export interface uploadDetails{
  title : string,
  tag : UPLOAD_TYPES
}

// {title: "Facta 1 (US Citizens Only)", tag : UPLOAD_TYPES.PASSPORT },
// {title: "Facta 2 (US Citizens Only)", tag : UPLOAD_TYPES.PASSPORT },
// {title: "Facta 3 (US Citizens Only)", tag : UPLOAD_TYPES.PASSPORT },

export enum UPLOAD_TYPES  {
  PASSPORT = "PASSPORT",
  SIGNATURE_CARD = "Signature Card",
  MANDATE_FORM = "Mandate Form",
  OTHER_DOCUMENTS = "Other Documents",
  ID_OF_RELATED_PARTIES = "ID of Related Parties",
  REGISTRATION_DOCUMENTS = "Registration Documents",
  VERIFICATION_OF_BUSINESS = "Business License",
  BUSINESS_ADDRESS_DOCUMENTS = "Verification of Business Address",
  BUSINESS_OPERATING_LICENSE = "Business Operating License (If Applicable)",
  RESOLUTION = "Resolution",
  FATCA_1 = "Facta 1 (US Citizens Only)",
  FATCA_2 = "Facta 2 (US Citizens Only)",
  FATCA_3 = "Facta 3 (US Citizens Only)",
}


@Component({
  selector: 'app-add-documents-upload',
  templateUrl: './documents-upload.component.html',
  styleUrls: ['./documents-upload.component.scss']
})
export class AddDocumentUploadComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  panelOpenState = false;

  PAGE_STATE: PROGRESS_STATE = PROGRESS_STATE.DONE;
  PROGRESS = PROGRESS_STATE;

  UPLOAD_FILES_TYPES = UPLOAD_TYPES;

  @Input() documentUploadInfo : IDocumentUploadSelectInfo<IPickedFile[]>  = new DocumentUploadInfo();
  @Output() documentUploadInfoChange  = new EventEmitter<IDocumentUploadSelectInfo<IPickedFile[]>>();

  @Input() isDocumentUploadValid = false;
  @Output() isDocumentUploadValidChange = new EventEmitter<boolean>();
  

  arrDetails1 : uploadDetails[] = [
    {title: "Passport Picture", tag : UPLOAD_TYPES.PASSPORT },
    {title: "Signature Card", tag : UPLOAD_TYPES.SIGNATURE_CARD },
    {title: "Mandate Form", tag : UPLOAD_TYPES.MANDATE_FORM },
    {title: "Other Documents", tag : UPLOAD_TYPES.OTHER_DOCUMENTS },
  ]

  arrDetails2 : uploadDetails[] = [
    {title: "ID of Related Parties", tag : UPLOAD_TYPES.ID_OF_RELATED_PARTIES },
    {title: "Registration Documents", tag : UPLOAD_TYPES.REGISTRATION_DOCUMENTS },
    {title: "Verification of Business Address", tag : UPLOAD_TYPES.BUSINESS_ADDRESS_DOCUMENTS },
    {title: "Business Operating License (If Applicable)", tag : UPLOAD_TYPES.BUSINESS_OPERATING_LICENSE },
    {title: "Resolution", tag : UPLOAD_TYPES.RESOLUTION },
    
  ]

  arrDetails3 : uploadDetails[] = [
    {title: "Facta 1 (US Citizens Only)", tag : UPLOAD_TYPES.FATCA_1 },
    {title: "Facta 2 (US Citizens Only)", tag : UPLOAD_TYPES.FATCA_2 },
    {title: "Facta 3 (US Citizens Only)", tag : UPLOAD_TYPES.FATCA_3 },
  ]

  constructor(
    private pager: TableControllerService,
    private api: APIService,
    private _formBuilder: UntypedFormBuilder,
    public dialog: MatDialog,
  ) {
  }

  
  ngAfterViewChecked() {
    this.isDocumentUploadValid = this.validateDocumentsInfo();
    this.isDocumentUploadValidChange.emit(this.isDocumentUploadValid)
  }

  validateDocumentsInfo(){

    return true;
  }


  ngOnInit(): void {
    this.openDownloadDialog()
  }

  openDownloadDialog(){
    const dialogRef = this.dialog.open(DownloadFilesDialogComponent, {
      width: '490px',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result : {}) => {
      
      if(result){
      
      }      
    });
  }

  filesSelected(tag : UPLOAD_TYPES, event : any){
    
    const files = (event.target.files) as File[];

    if(tag === UPLOAD_TYPES.PASSPORT){
      for(const file of files){
        this.documentUploadInfo.passportPicture.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }else if(tag === UPLOAD_TYPES.SIGNATURE_CARD){
      for(const file of files){
        this.documentUploadInfo.signatureCard.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.MANDATE_FORM){
      for(const file of files){
        this.documentUploadInfo.mandatorySignature.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.OTHER_DOCUMENTS){
      for(const file of files){
        this.documentUploadInfo.others.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.ID_OF_RELATED_PARTIES){
      for(const file of files){
        this.documentUploadInfo.relatedParties.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.REGISTRATION_DOCUMENTS){
      for(const file of files){
        this.documentUploadInfo.registration.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.BUSINESS_ADDRESS_DOCUMENTS){

       for(const file of files){
        this.documentUploadInfo.businessAddress.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.BUSINESS_OPERATING_LICENSE){

      for(const file of files){
        this.documentUploadInfo.permit.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.RESOLUTION){
      for(const file of files){
        this.documentUploadInfo.resolution.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.FATCA_1){
      for(const file of files){
        this.documentUploadInfo.fatca1.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.FATCA_2){
      for(const file of files){
        this.documentUploadInfo.fatca2.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    else if(tag === UPLOAD_TYPES.FATCA_3){
      for(const file of files){
        this.documentUploadInfo.fatca3.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
    //verify if still been used
    else if(tag === UPLOAD_TYPES.VERIFICATION_OF_BUSINESS){
      for(const file of files){
        this.documentUploadInfo.license.push({
          name : file.name,
          file : file,
          url : "",
          isUploaded : false
        });
      }
    }
  }


  removeDocument(index : number, tag : UPLOAD_TYPES, file : IPickedFile){
    
    if(tag === UPLOAD_TYPES.PASSPORT){
      this.documentUploadInfo.passportPicture = this.documentUploadInfo.passportPicture.filter((_, position)=> position !== index)
    }else if(tag === UPLOAD_TYPES.SIGNATURE_CARD){
      this.documentUploadInfo.signatureCard = this.documentUploadInfo.signatureCard.filter((_, position)=> position !== index)
    }
    else if(tag === UPLOAD_TYPES.MANDATE_FORM){
      this.documentUploadInfo.mandatorySignature = this.documentUploadInfo.mandatorySignature.filter((_, position)=> position !== index)
    }
    else if(tag === UPLOAD_TYPES.OTHER_DOCUMENTS){
      this.documentUploadInfo.others = this.documentUploadInfo.others.filter((_, position)=> position !== index)
    }
    else if(tag === UPLOAD_TYPES.ID_OF_RELATED_PARTIES){
      this.documentUploadInfo.relatedParties = this.documentUploadInfo.relatedParties.filter((_, position)=> position !== index)
    }
    else if(tag === UPLOAD_TYPES.REGISTRATION_DOCUMENTS){
      this.documentUploadInfo.registration = this.documentUploadInfo.registration.filter((_, position)=> position !== index)
    }
    else if(tag === UPLOAD_TYPES.BUSINESS_ADDRESS_DOCUMENTS){
      this.documentUploadInfo.businessAddress = this.documentUploadInfo.businessAddress.filter((_, position)=> position !== index)
    }
    else if(tag === UPLOAD_TYPES.BUSINESS_OPERATING_LICENSE){
      this.documentUploadInfo.permit = this.documentUploadInfo.permit.filter((_, position)=> position !== index)
    }

    else if(tag === UPLOAD_TYPES.RESOLUTION){
      this.documentUploadInfo.resolution = this.documentUploadInfo.resolution.filter((_, position)=> position !== index)
    }
    else if(tag === UPLOAD_TYPES.FATCA_1){
      this.documentUploadInfo.fatca1 = this.documentUploadInfo.fatca1.filter((_, position)=> position !== index)
    }
    else if(tag === UPLOAD_TYPES.FATCA_2){
      this.documentUploadInfo.fatca2 = this.documentUploadInfo.fatca2.filter((_, position)=> position !== index)

    }
    else if(tag === UPLOAD_TYPES.FATCA_3){
      this.documentUploadInfo.fatca3 = this.documentUploadInfo.fatca3.filter((_, position)=> position !== index)

    }
  }

}
