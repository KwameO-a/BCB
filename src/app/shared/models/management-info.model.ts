import { IAdditionalDetails, IDirector, IPrincipalDatails, ISignitoryDetails, PrincipalDetails } from "./account.model"

export interface IManagementInfoResponse{
  
    principal: {
      surname: string,
      firstname: string,
      othernames: string,
      mothersMaidenName: string,
      dateOfBirth: string,
      gender: string,
      nationality: string,
      residentialPermit: string,
      meansOfIdentification: string,
      idNumber: string,
      idIssueDate: string,
      idExpiryDate: string,
      occupation: string,
      city: string,
      jobTitle: string,
      primaryPhoneNumber: string,
      secondaryPhoneNumber: string,
      email: string,
      mmda: string,
      region: string,
      residentialAddress : string,
      nearestLandmark : string
    },
    directors: {
        surname: string,
        firstname: string,
        othernames: string,
        mothersMaidenName: string,
        dateOfBirth: string,
        gender: string,
        nationality: string,
        residentialPermit: string,
        meansOfIdentification: string,
        idNumber: string,
        idIssueDate: string,
        idExpiryDate: string,
        occupation: string,
        city: string,
        jobTitle: string,
        primaryPhoneNumber: string,
        secondaryPhoneNumber: string,
        email: string,
        mmda: string,
        region: string,
        statusAsDirector: [],
        residentialAddress : string
        nearestLandmark : string
    }[],
    additionalDetails: {
      nameOfAffiliatedCompany: string,
      fullname: string,
      percentageHolding: string,
      email: string,
      address: string,
      status: string,
      nationality: string,
      beneficiaries: string,
      registrationCertificate: string,
      mobileNumber: string,
      countryOfIncoporation: string
    }[],
    signitory: {                
    surname: string,
    firstname: string,
    othernames: string,
    mothersMaidenName: string,
    dateOfBirth: string,
    gender: string,
    nationality: string,
    residentialPermit: string,
    meansOfIdentification: string,
    idNumber: string,
    idIssueDate: string,
    idExpiryDate: string,
    occupation: string,
    city: string,
    jobTitle: string,
    primaryPhoneNumber: string,
    secondaryPhoneNumber: string,
    email: string,
    mmda: string,
    region: string,
    classOfSignatory : string,
    nearestLandmark : string,
    residentialAddress : string
  }[]
  
}


export interface IManagementInfo {
    principal: IPrincipalDatails;
    directors: IDirector[],
    additionalDetails: IAdditionalDetails[],
    signitory: ISignitoryDetails[];
  
    transform() : any; //set type later
  }

  
export class ManagementInfo implements IManagementInfo {
    public principal: IPrincipalDatails;
    public directors: IDirector[];
    public additionalDetails: IAdditionalDetails[];
    public signitory: ISignitoryDetails[];
  
    constructor() {
      this.principal = new PrincipalDetails();
      this.directors = [];
      this.additionalDetails = [];
      this.signitory = [];
    }
  
  
    transform(){
  
  
      // this.principal.dateOfBirth = getDateFormat( this.principal.dateOfBirth as Date)
      // this.principal.idIssueDate = getDateFormat(this.principal.idIssueDate as Date)
      // this.principal.idExpiryDate = getDateFormat(this.principal.idExpiryDate as Date)
  
  
  
      //iterate through directors, signatories and fix issue, dob & expiry
      // for( const sig  of this.signitory){
      //   sig.dateOfBirth = getDateFormat( sig.dateOfBirth as Date)
      //   sig.idIssueDate = getDateFormat(sig.idIssueDate as Date)
      //   sig.idExpiryDate = getDateFormat(sig.idExpiryDate as Date)
      // }
  
      // for( const dir  of this.directors){
      //   dir.dateOfBirth = getDateFormat(dir.dateOfBirth as Date)
      //   dir.idIssueDate = getDateFormat(dir.idIssueDate as Date)
      //   dir.idExpiryDate = getDateFormat(dir.idExpiryDate as Date)
      // }
  
  
      return {
        ...this,
      }
    }
  }
  
  