import { CONTACT_FREQUENCY } from '../constants/app.constants';
import { getDateFormat, isDate } from '../utils/date.utils';
import { IHostHeaderInfo } from './host-header-info.model';
import {
  IManagementInfo,
  IManagementInfoResponse,
  ManagementInfo,
} from './management-info.model';
import { IRequestHeaderInfo } from './request-header-info.model';

export type Status =
  | 'FRESH'
  | 'DRAFT'
  | 'INCOMPLETE'
  | 'SCREENING'
  | 'KYC_REVIEW'
  | 'PROCESSING'
  | 'RETURNED'
  | 'COMPLETED'
  | 'PARKED'
  | 'FAILED'
  | 'REJECTED';

export interface IActivityInputType {
  checked: boolean;
  name: string;
  id: string;
  formName?: string;
}

export interface IAccountInfo {
  businessType: string;
  fundSource: string[];
  freqPref: CONTACT_FREQUENCY;
  mode: string[];
  keyContPerson: string;
  bdcCode: string;
  currency: string[];
  activityType: string[];
  preferredBranch: string;
  email: string;
  mobileNumber: string;
  accountSelection: string[];
  rm: string;
  rmNo: string;
  reason: string[];

  //EMail & SMS alerts  variables
  emailAlert: boolean;
  smsAlert: boolean;

  //alerts - account info
  alerts: {
    primaryEmail: '';
    primaryPhone: '';
    otherEmails: [];
    otherPhones: [];
  };

  alertSelection: string;

  transform(): IAccountInfoRequest;
}

export interface IAccountInfoRequest {
  businessType: string;
  fundSource: string;
  reason: string;
  freqPref: CONTACT_FREQUENCY;
  mode: { contactMode: string }[];
  keyContPerson: string;
  bdcCode: string;
  currency: string[];
  activityType: string;
  preferredBranch: string;
  email: string;
  mobileNumber: string;
  accountSelection: string;
  rm: string;
  rmNo: string;
  //EMail & SMS alerts  variables
  emailAlert: boolean;
  smsAlert: boolean;

  //alerts - account info
  alerts: {
    primaryEmail: string;
    primaryPhone: string;
    otherEmails: string[];
    otherPhones: string[];
  };

  alertSelection: string;
}
export class AccountInfo implements IAccountInfo {
  public businessType: string;
  public fundSource: string[];
  public reason: string[];
  public freqPref: CONTACT_FREQUENCY;
  public mode: string[];
  public keyContPerson: string;
  public bdcCode: string;
  public currency: string[];
  public preferredBranch: string;
  public email: any;
  public mobileNumber: string;
  public rm: string;
  public rmNo: string;
  public emailAlert: boolean;
  public smsAlert: boolean;
  public activityType: string[];
  public accountSelection: string[] = [];
  public alertSelection = '';
  public alerts: {
    primaryEmail: '';
    primaryPhone: '';
    otherEmails: [];
    otherPhones: [];
  } = {
    primaryEmail: '',
    primaryPhone: '',
    otherEmails: [],
    otherPhones: [],
  };

  constructor() {
    this.businessType = '';
    this.fundSource = [];
    this.reason = [];
    this.freqPref = 'Weekly';
    this.mode = [];
    this.keyContPerson = '';
    this.preferredBranch = '';
    this.email = '';
    this.mobileNumber = '';
    this.rm = '';
    this.rmNo = '';
    this.bdcCode = '';

    this.emailAlert = true;
    this.smsAlert = false;
    this.activityType = [];
    this.currency = [];
  }

  transform(): IAccountInfoRequest {
    const _mode: { contactMode: string }[] = [];

    if (this.mode) {
      for (const _temp of this.mode) {
        _mode.push({
          contactMode: _temp,
        });
      }
    }

    const data: IAccountInfoRequest = {
      businessType: this.businessType,
      fundSource: this.fundSource.join(', '),
      reason: this.reason.join(', '),
      freqPref: this.freqPref,
      mode: _mode,
      keyContPerson: this.keyContPerson,
      preferredBranch: this.preferredBranch,
      email: this.email,
      mobileNumber: this.mobileNumber,
      rm: this.rm,
      rmNo: this.rmNo,
      emailAlert: this.emailAlert,
      activityType: (this.activityType || []).join(', '),
      currency: this.currency,
      accountSelection: (this.accountSelection || []).join(', '),
      alertSelection: '',
      smsAlert: this.smsAlert,
      alerts: {
        primaryEmail: this.email,
        primaryPhone: this.mobileNumber,
        otherEmails: [this.email],
        otherPhones: [this.mobileNumber],
      },
      bdcCode: ''
    };
    return data;
  }
}

export interface IBusinessInfo {
  affiliatedCompany: string;
  annualTurnover: any;
  applicationStage: any;
  assignedTo: string;
  comments: string;
  country: string;
  createdBy: string;
  entityType: string;
  physicalAddress: string;
  principalShareholders: string;
  regDate: Date;
  registeredName: string;
  registrationNo: string;
  residency: string;
  sector: string;
  status: Status;
  telephone: string;
  tin: string;
  postalAddress: string;
  tradeName: string;
  additionalDetails?: string;
  reason: string[];

  transform(entityType: string): IBusinessInfo;
}

export class BusinessInfo implements IBusinessInfo {
  public affiliatedCompany: string;
  public annualTurnover: any;
  public applicationStage: any;
  public assignedTo: string;
  public comments: string;
  public country: string;
  public createdBy: string;
  public entityType: string;
  public physicalAddress: string;
  public postalAddress: string;
  public principalShareholders: string;
  public regDate: Date;
  public registeredName: string;
  public registrationNo: string;
  public residency: string;
  public sector: string;
  public status: Status;
  public telephone: string;
  public tin: string;
  public tradeName: string;
  public additionalDetails?: string | undefined;
  public reason: string[];

  constructor() {
    this.affiliatedCompany = '';
    this.annualTurnover = '';
    this.applicationStage = '';
    this.assignedTo = '';
    this.comments = '';
    this.country = '';
    this.createdBy = '';
    this.entityType = '';
    this.physicalAddress = '';
    this.postalAddress = '';
    this.principalShareholders = '';
    this.regDate = new Date();
    this.registeredName = '';
    this.registrationNo = '';
    this.residency = '';
    this.sector = '';
    this.status = 'FRESH';
    this.telephone = '';
    this.tin = '';
    this.tradeName = '';
    this.additionalDetails = '';
    this.reason = [];
  }

  transform(entityType: string) {
    return {
      ...this,
      entityType: entityType,
      // regDate : getDateFormat(this.regDate)
    };
  }
}

export interface DocInfo {
  businessId?: string[];
  businessAddress?: string[];
  license?: string[];
  permit?: string[];
  registration?: string[];
  relatedParties?: string[];
  resolution?: string[];
  passportPicture?: string[];
  signatureCard?: string[];
  mandatorySignature?: string[];
  others?: string[];
  fatca1?: string[];
  fatca2?: string[];
  fatca3?: string[];
}

export interface FormData {
  accountInfo: IAccountInfo;
  applicationStage: number;
  businessInfo: IBusinessInfo;
  docInfo: DocInfo;
  final: boolean;
  hostHeaderInfo: IHostHeaderInfo;
  newManagementInfoList: ManagementInfo;
  channelsInfo: IChannelsInfo;
}

export interface IChannelsInfo {
  autorisers?: {
    name: string;
    signatoryType: string;
  }[];
  bankUserData?: {
    contact: string;
    email: string;
    fullName: string;
  }[];
  capturers?: string;
  channel?: string;
  comments?: string;
  functionality?: string;
}

export interface IPrincipalDatails {
  surname: string;
  firstname: string;
  othernames: string;
  mothersMaidenName: string;
  gender: string;
  nationality: string;
  residentialPermit: string;
  meansOfIdentification: string;
  idNumber: string;
  dateOfBirth: Date | string; //store the string or date in it
  idIssueDate: Date | string;
  idExpiryDate: Date | string;
  occupation: string;
  city: string;
  jobTitle: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  residentialAddress: string;
  nearestLandmark: string;
  email: string;
  mmda: string;
  region: string;
}

export class PrincipalDetails implements IPrincipalDatails {
  public surname: string;
  public firstname: string;
  public othernames: string;
  public mothersMaidenName: string;
  public gender: string;
  public nationality: string;
  public residentialAddress: string;
  public residentialPermit: string;
  public meansOfIdentification: string;
  public idNumber: string;
  public dateOfBirth: Date;
  public idIssueDate: Date;
  public idExpiryDate: Date;
  public occupation: string;
  public city: string;
  public jobTitle: string;
  public primaryPhoneNumber: string;
  public secondaryPhoneNumber: string;
  public nearestLandmark: string;
  public email: string;
  public mmda: string;
  public region: string;

  constructor() {
    this.surname = '';
    this.firstname = '';
    this.othernames = '';
    this.mothersMaidenName = '';
    this.gender = '';
    this.nationality = '';
    this.residentialAddress = '';
    this.residentialPermit = '';
    this.meansOfIdentification = '';
    this.idNumber = '';
    this.dateOfBirth = new Date();
    this.idIssueDate = new Date();
    this.idExpiryDate = new Date();
    this.occupation = '';
    this.city = '';
    this.jobTitle = '';
    this.primaryPhoneNumber = '';
    this.secondaryPhoneNumber = '';
    this.nearestLandmark = '';
    this.email = '';
    this.mmda = '';
    this.region = '';
  }
}

export interface ISignitoryDetails {
  surname: string;
  firstname: string;
  othernames: string;
  mothersMaidenName: string;
  gender: string;
  nationality: string;
  residentialPermit: string;
  meansOfIdentification: string;
  idNumber: string;
  dateOfBirth: Date | string;
  idIssueDate: Date | string;
  idExpiryDate: Date | string;
  occupation: string;
  city: string;
  jobTitle: string;
  residentialAddress: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  nearestLandmark: string;
  email: string;
  mmda: string;
  region: string;
  classOfSignatory: string;
}

export class SignatoryDetails implements ISignitoryDetails {
  public surname: string;
  public firstname: string;
  public othernames: string;
  public mothersMaidenName: string;
  public gender: string;
  public nationality: string;
  public residentialPermit: string;
  public meansOfIdentification: string;
  public idNumber: string;
  public dateOfBirth: Date;
  public idIssueDate: Date;
  public idExpiryDate: Date;
  public occupation: string;
  public city: string;
  public jobTitle: string;
  public residentialAddress: string;
  public primaryPhoneNumber: string;
  public secondaryPhoneNumber: string;
  public nearestLandmark: string;
  public email: string;
  public mmda: string;
  public region: string;
  public classOfSignatory: string;

  constructor() {
    this.surname = '';
    this.othernames = '';
    this.firstname = '';
    this.mothersMaidenName = '';
    this.dateOfBirth = new Date();
    this.gender = '';
    this.nationality = '';
    this.residentialPermit = '';
    this.meansOfIdentification = '';
    this.idNumber = '';
    this.idExpiryDate = new Date();
    this.idIssueDate = new Date();
    this.idExpiryDate = new Date();
    this.occupation = '';
    this.city = '';
    this.jobTitle = '';
    this.residentialAddress = '';
    this.primaryPhoneNumber = '';
    this.secondaryPhoneNumber = '';
    this.nearestLandmark = '';
    this.email = '';
    this.mmda = '';
    this.region = '';
    this.classOfSignatory = '';
  }
}
export interface IDirector {
  surname: string;
  firstname: string;
  othernames: string;
  mothersMaidenName: string;
  gender: string;
  nationality: string;
  residentialPermit: string;
  residentialAddress: string;
  meansOfIdentification: string;
  idNumber: string;
  dateOfBirth: Date | string;
  idIssueDate: Date | string;
  idExpiryDate: Date | string;
  occupation: string;
  city: string;
  jobTitle: string;
  primaryPhoneNumber: string;
  secondaryPhoneNumber: string;
  nearestLandmark: string;
  email: string;
  mmda: string;
  region: string;
  statusAsDirector: string[];
}

export class DirectorInfo implements IDirector {
  public surname: string;
  public firstname: string;
  public othernames: string;
  public mothersMaidenName: string;
  public gender: string;
  public nationality: string;
  public residentialPermit: string;
  public residentialAddress: string;
  public meansOfIdentification: string;
  public idNumber: string;
  public dateOfBirth: Date;
  public idIssueDate: Date;
  public idExpiryDate: Date;
  public occupation: string;
  public city: string;
  public jobTitle: string;
  public primaryPhoneNumber: string;
  public secondaryPhoneNumber: string;
  public nearestLandmark: string;
  public email: string;
  public mmda: string;
  public region: string;
  public statusAsDirector: string[];

  constructor() {
    this.firstname = '';
    this.surname = '';
    this.othernames = '';
    this.idNumber = '';
    this.mmda = '';
    this.region = '';
    this.email = '';
    this.statusAsDirector = [];
    this.nearestLandmark = '';
    this.residentialAddress = '';
    this.primaryPhoneNumber = '';
    this.secondaryPhoneNumber = '';
    this.jobTitle = '';
    this.city = '';
    this.occupation = '';
    this.idIssueDate = new Date();
    this.idExpiryDate = new Date();
    this.meansOfIdentification = '';
    this.residentialPermit = '';
    this.dateOfBirth = new Date();
    this.gender = '';
    this.nationality = '';
    this.mothersMaidenName = '';
  }
}

export interface IAdditionalDetails {
  nameOfAffiliatedCompany: string;
  fullname: string;
  percentageHolding: string;
  email: string;
  address: string;
  status: string;
  nationality: string;
  beneficiaries: string;
  registrationCertificate: string;
  mobileNumber: string;
  countryOfIncoporation: string;
}

export class AdditionalDetails implements IAdditionalDetails {
  public nameOfAffiliatedCompany: string = '';
  public fullname: string = '';
  public percentageHolding: string = '';
  public email: string = '';
  public address: string = '';
  public status: string = '';
  public nationality: string = '';
  public beneficiaries: string = '';
  public registrationCertificate: string = '';
  public mobileNumber: string = '';
  public countryOfIncoporation: string = '';

  constructor() {}
}

export interface IAuthorizer {
  name: string;
  signatoryType: string;
}

export interface IBankingUser {
  contact: string;
  email: string;
  fullName: string;
}
export interface IDigitalChannels {
  autorisers: IAuthorizer[];
  bankUserData: IBankingUser[];
  capturers: string[];
  channel: string[];
  comments: string;
  functionality: string[];

  transform(): IDigitalChannelsResponse;
}

export interface IDigitalChannelsResponse {
  autorisers: IAuthorizer[];
  bankUserData: IBankingUser[];
  capturers: string;
  channel: string;
  comments: string;
  functionality: string;
}

export class DigitalChannels implements IDigitalChannels {
  public autorisers: IAuthorizer[] = [];
  public bankUserData: IBankingUser[] = [];
  public capturers: string[] = [];
  public channel: string[] = [];
  public comments: string = '';
  public functionality: string[] = [];

  constructor() {}

  transform(): IDigitalChannelsResponse {
    const data: IDigitalChannelsResponse = {
      capturers: this.capturers.join(','),
      autorisers: this.autorisers,
      channel: this.channel.join(','),
      comments: this.comments,
      functionality: this.functionality.join(','),
      bankUserData: this.bankUserData,
    };
    return data;
  }
}

export interface IDocumentInfo {
  businessId: string[];
  businessAddress: string[];
  license: string[];
  permit: string[];
  registration: string[];
  relatedParties: string[];
  resolution: string[];
  passportPicture: string[];
  signatureCard: string[];
  mandatorySignature: string[];
  others: string[];
  fatca1: string[];
  fatca2: string[];
  fatca3: string[];
}

export interface IPickedFile {
  file: File | null;
  name: string;
  url: string | ArrayBuffer;
  isUploaded: boolean;
}

export interface IDocumentUploadSelectInfo<T> {
  businessId: T;
  businessAddress: T;
  license: T;
  permit: T;
  registration: T;
  relatedParties: T;
  resolution: T;
  passportPicture: T;
  signatureCard: T;
  mandatorySignature: T;
  others: T;
  fatca1: T;
  fatca2: T;
  fatca3: T;
}

export interface IDocumentUploadSelectInfoResp<T> {
  businessId: T;
  businessAddress: T;
  license: T;
  permit: T;
  registration: T;
  relatedParties: T;
  resolution: T;
  passportPicture: T;
  signatureCard: T;
  mandatorySignature: T;
  others: T;
  fatca1: T;
  fatca2: T;
  fatca3: T;
}

export class DocumentUploadInfo
  implements IDocumentUploadSelectInfo<IPickedFile[]>
{
  public businessId: IPickedFile[] = [];
  public businessAddress: IPickedFile[] = [];
  public license: IPickedFile[] = [];
  public permit: IPickedFile[] = [];
  public registration: IPickedFile[] = [];
  public relatedParties: IPickedFile[] = [];
  public resolution: IPickedFile[] = [];
  public passportPicture: IPickedFile[] = [];
  public signatureCard: IPickedFile[] = [];
  public mandatorySignature: IPickedFile[] = [];
  public others: IPickedFile[] = [];
  public fatca1: IPickedFile[] = [];
  public fatca2: IPickedFile[] = [];
  public fatca3: IPickedFile[] = [];

  constructor() {}

  transform() {
    const res: IDocumentUploadSelectInfo<string[]> = {
      businessId: [],
      businessAddress: [],
      license: [],
      permit: [],
      registration: [],
      relatedParties: [],
      resolution: [],
      passportPicture: [],
      signatureCard: [],
      mandatorySignature: [],
      others: [],
      fatca1: [],
      fatca2: [],
      fatca3: [],
    };

    //filter business Ids
    this.businessId.map((data) => {
      if (data.isUploaded) res.businessId.push(data.url as string);
    });
    //businessAddress business Ids
    this.businessAddress.map((data) => {
      if (data.isUploaded) res.businessAddress.push(data.url as string);
    });

    //license business Ids
    this.license.map((data) => {
      if (data.isUploaded) res.license.push(data.url as string);
    });

    //permit business Ids
    this.permit.map((data) => {
      if (data.isUploaded) res.permit.push(data.url as string);
    });

    //registration business Ids
    this.registration.map((data) => {
      if (data.isUploaded) res.registration.push(data.url as string);
    });

    //relatedParties business Ids
    this.relatedParties.map((data) => {
      if (data.isUploaded) res.relatedParties.push(data.url as string);
    });

    //resolution business Ids
    this.resolution.map((data) => {
      if (data.isUploaded) res.resolution.push(data.url as string);
    });

    //passportPicture business Ids
    this.passportPicture.map((data) => {
      if (data.isUploaded) res.passportPicture.push(data.url as string);
    });

    //signatureCard business Ids
    this.signatureCard.map((data) => {
      if (data.isUploaded) res.signatureCard.push(data.url as string);
    });

    //mandatorySignature business Ids
    this.mandatorySignature.map((data) => {
      if (data.isUploaded) res.mandatorySignature.push(data.url as string);
    });

    //others business Ids
    this.others.map((data) => {
      if (data.isUploaded) res.others.push(data.url as string);
    });

    //fatca1 business Ids
    this.fatca1.map((data) => {
      if (data.isUploaded) res.fatca1.push(data.url as string);
    });

    //fatca2 business Ids
    this.fatca2.map((data) => {
      if (data.isUploaded) res.fatca2.push(data.url as string);
    });

    //fatca3 business Ids
    this.fatca3.map((data) => {
      if (data.isUploaded) res.fatca3.push(data.url as string);
    });

    return res;
  }
}

export interface MultipleFileUploadResponse {
  responseCode: string;
  responseMsg: string;
  fileInfo: FileInfo[];
}

export interface FileInfo {
  fileName: string;
  filePath: string;
}

export interface ISaveClientInfoRequest {
  hostHeaderInfo: IRequestHeaderInfo;
  businessInfo: IBusinessInfo;
  applicationStage: number;
  docInfo: IDocumentInfo;
  accountInfo: IAccountInfoRequest;
  newManagementInfoList: IManagementInfo;
  channelsInfo: IDigitalChannelsResponse;
  final: boolean;
  verifiedEmail: false;
  updateStatus: SAVE_STATE;
}

// MOVE TO A NEW FILE ------------------------------------------------------------------------

export interface IAccountInfoResponse {
  freqPref: string;
  mode: {
    contactMode: string;
    businessId: string;
  }[];
  alerts: {
    primaryEmail: string;
    primaryPhone: string;
    otherEmails: string[];
    otherPhones: string[];
  };
  businessId: string;
  reason: string;
  activityType: string;
  keyContPerson: string;
  businessType: string;
  fundSource: string;
  rm: string;
  rmNo: string;
  preferredBranch: string;
  accountSelection: string;
}

export interface IBusinessInfoResponse {
  affiliatedCompany: string;
  annualTurnover: number;
  applicationStage: number;
  country: string;
  createdBy: string;
  createdDate: string;
  id: number;
  lastUpdateDate: string;
  physicalAddress: string;
  postalAddress: string;
  principalShareholders: string;
  regDate: string;
  registeredName: string;
  registrationNo: string;
  residency: string;
  sector: string;
  status: string;
  telephone: string;
  tin: string;
  tradeName: string;
  additionalDetails: string;
}

export interface IUserAccountInfoResponse {
  hostHeaderInfo: IHostHeaderInfo;
  status: string;
  accountInfo: IAccountInfoResponse;
  businessInfo: IBusinessInfoResponse;
  newManagementInfoList: IManagementInfoResponse;
  channelsInfo: IDigitalChannelsResponse;
  docInfo: IDocumentInfo;
}

export class UserAccountInfoResponse implements IUserAccountInfoResponse {
  constructor(
    public hostHeaderInfo: IHostHeaderInfo,
    public status: string,
    public accountInfo: IAccountInfoResponse,
    public businessInfo: IBusinessInfoResponse,
    public newManagementInfoList: IManagementInfoResponse,
    public channelsInfo: IDigitalChannelsResponse,
    public docInfo: IDocumentInfo
  ) {}

  static unpack(data: UserAccountInfoResponse): {
    businessInfo: IBusinessInfo;
    managementInfo: IManagementInfo;
    documentUploadInfo: IDocumentUploadSelectInfo<IPickedFile[]>;
    accountInfo: IAccountInfo;
    channelsInfo: IDigitalChannels;
  } {
    const managementInfo: IManagementInfo = new ManagementInfo();
    const documentUploadInfo: IDocumentUploadSelectInfo<IPickedFile[]> =
      new DocumentUploadInfo();
    const digitalChannels: IDigitalChannels = new DigitalChannels();

    //unpack documents
    //unpack pssport pictures

    if (data.docInfo && data.docInfo.passportPicture) {
      documentUploadInfo.passportPicture = packAsType(
        data?.docInfo?.passportPicture
      );
    }

    if (data.docInfo && data.docInfo.signatureCard) {
      documentUploadInfo.signatureCard = packAsType(
        data?.docInfo?.signatureCard
      );
    }
    if (data.docInfo && data.docInfo.mandatorySignature) {
      documentUploadInfo.mandatorySignature = packAsType(
        data?.docInfo?.mandatorySignature
      );
    }
    if (data.docInfo && data.docInfo.others) {
      documentUploadInfo.others = packAsType(data?.docInfo?.others);
    }
    if (data.docInfo && data.docInfo.businessId) {
      documentUploadInfo.businessId = packAsType(data?.docInfo?.businessId);
    }
    if (data.docInfo && data.docInfo.registration) {
      documentUploadInfo.registration = packAsType(data?.docInfo?.registration);
    }
    if (data.docInfo && data.docInfo.businessAddress) {
      documentUploadInfo.businessAddress = packAsType(
        data?.docInfo?.businessAddress
      );
    }
    if (data.docInfo && data.docInfo.resolution) {
      documentUploadInfo.resolution = packAsType(data?.docInfo?.resolution);
    }
    if (data.docInfo && data.docInfo.fatca1) {
      documentUploadInfo.fatca1 = packAsType(data?.docInfo?.fatca1);
    }
    if (data.docInfo && data.docInfo.fatca2) {
      documentUploadInfo.fatca2 = packAsType(data?.docInfo?.fatca2);
    }
    if (data.docInfo && data.docInfo.fatca3) {
      documentUploadInfo.fatca3 = packAsType(data?.docInfo?.fatca3);
    }
    if (data.docInfo && data.docInfo.license) {
      documentUploadInfo.license = packAsType(data?.docInfo?.license);
    }
    if (data.docInfo && data.docInfo.permit) {
      documentUploadInfo.permit = packAsType(data?.docInfo?.permit);
    }
    if (data.docInfo && data.docInfo.relatedParties) {
      documentUploadInfo.relatedParties = packAsType(
        data?.docInfo?.relatedParties
      );
    }

    const businessInfo: IBusinessInfo = new BusinessInfo();
    businessInfo.affiliatedCompany =
      data?.businessInfo?.affiliatedCompany || businessInfo?.affiliatedCompany;
    businessInfo.annualTurnover = data?.businessInfo?.annualTurnover;
    businessInfo.applicationStage = data?.businessInfo?.applicationStage;
    businessInfo.country = data?.businessInfo?.country;
    businessInfo.createdBy = data?.businessInfo?.createdBy;

    businessInfo.physicalAddress = data?.businessInfo?.physicalAddress;
    businessInfo.postalAddress = data?.businessInfo?.postalAddress;
    businessInfo.principalShareholders =
      data?.businessInfo?.principalShareholders;

    businessInfo.regDate = new Date(data?.businessInfo?.regDate);
    businessInfo.registeredName = data?.businessInfo?.registeredName;
    businessInfo.registrationNo = data?.businessInfo?.registrationNo;
    businessInfo.residency = data?.businessInfo?.residency;
    businessInfo.sector = data?.businessInfo?.sector;
    businessInfo.telephone = data?.businessInfo?.telephone;
    businessInfo.tin = data?.businessInfo?.tin;
    businessInfo.tradeName = data?.businessInfo?.tradeName;
    businessInfo.additionalDetails = data?.businessInfo?.additionalDetails;

    const accountInfo: IAccountInfo = new AccountInfo();
    accountInfo.email = data?.accountInfo?.alerts?.primaryEmail || '';
    accountInfo.mobileNumber = data?.accountInfo?.alerts.primaryPhone || '';
    accountInfo.reason =
      data?.accountInfo?.reason?.split(',').map((val) => val.trim()) || [];
    accountInfo.rm = data?.accountInfo?.rm || '';
    accountInfo.rmNo = data?.accountInfo?.rmNo || '';

    accountInfo.keyContPerson = data?.accountInfo?.keyContPerson || '';

    accountInfo.preferredBranch = data?.accountInfo?.preferredBranch || '';
    accountInfo.fundSource =
      data?.accountInfo?.fundSource?.split(',').map((val) => val.trim()) || [];
    accountInfo.businessType = data?.accountInfo?.businessType;
    accountInfo.freqPref = data?.accountInfo?.freqPref as CONTACT_FREQUENCY;
    accountInfo.activityType =
      data?.accountInfo?.activityType?.split(',').map((val) => val.trim()) ||
      [];

    accountInfo.accountSelection = data?.accountInfo?.accountSelection
      ?.split(',')
      .map((val) => val.trim());
    accountInfo.currency = ['GHS'];
    accountInfo.mode = data?.accountInfo?.mode.map((res) => res.contactMode);
    accountInfo.emailAlert = data?.accountInfo?.alerts?.primaryEmail
      ? true
      : false;
    accountInfo.smsAlert = data?.accountInfo?.alerts?.primaryPhone
      ? true
      : false;

    //Management info unpacking - force push data when null
    if (data.newManagementInfoList && data.newManagementInfoList?.principal) {
      managementInfo.principal.surname =
        data?.newManagementInfoList?.principal?.surname || '';
      managementInfo.principal.firstname =
        data?.newManagementInfoList?.principal?.firstname || '';
      managementInfo.principal.othernames =
        data?.newManagementInfoList?.principal?.othernames || '';
      managementInfo.principal.mothersMaidenName =
        data?.newManagementInfoList?.principal?.mothersMaidenName || '';

      if (isDate(data.newManagementInfoList.principal.idExpiryDate)) {
        managementInfo.principal.dateOfBirth = new Date(
          data.newManagementInfoList.principal.dateOfBirth
        );
      } else {
        managementInfo.principal.dateOfBirth = new Date();
      }

      managementInfo.principal.nationality =
        data?.newManagementInfoList?.principal?.nationality || '';
      managementInfo.principal.gender =
        data?.newManagementInfoList?.principal?.gender || '';
      managementInfo.principal.residentialPermit =
        data?.newManagementInfoList?.principal?.residentialPermit || '';
      managementInfo.principal.meansOfIdentification =
        data?.newManagementInfoList?.principal?.meansOfIdentification || '';
      managementInfo.principal.idNumber =
        data?.newManagementInfoList?.principal?.idNumber || '';

      if (isDate(data.newManagementInfoList.principal.idIssueDate)) {
        managementInfo.principal.idIssueDate = new Date(
          data.newManagementInfoList.principal.idIssueDate
        );
      } else {
        managementInfo.principal.idIssueDate = new Date();
      }

      if (isDate(data.newManagementInfoList.principal.idExpiryDate)) {
        managementInfo.principal.idExpiryDate = new Date(
          data.newManagementInfoList.principal.idExpiryDate
        );
      } else {
        managementInfo.principal.idExpiryDate = new Date();
      }

      managementInfo.principal.occupation =
        data?.newManagementInfoList?.principal?.occupation || '';
      managementInfo.principal.city =
        data?.newManagementInfoList?.principal?.city || '';
      managementInfo.principal.jobTitle =
        data?.newManagementInfoList?.principal?.jobTitle || '';
      managementInfo.principal.primaryPhoneNumber =
        data?.newManagementInfoList?.principal?.primaryPhoneNumber || '';
      managementInfo.principal.secondaryPhoneNumber =
        data?.newManagementInfoList?.principal?.secondaryPhoneNumber || '';
      managementInfo.principal.email =
        data?.newManagementInfoList?.principal?.email || '';
      managementInfo.principal.mmda =
        data?.newManagementInfoList?.principal?.mmda || '';
      managementInfo.principal.region =
        data?.newManagementInfoList?.principal?.region || '';

      managementInfo.principal.nearestLandmark =
        data?.newManagementInfoList?.principal?.nearestLandmark || '';
      managementInfo.principal.residentialAddress =
        data?.newManagementInfoList?.principal?.residentialAddress || '';
    }

    //loop through the signatories and unpack
    if (data?.newManagementInfoList && data?.newManagementInfoList.signitory) {
      for (const sig of data?.newManagementInfoList?.signitory) {
        const _sign: ISignitoryDetails = {
          surname: sig.surname,
          firstname: sig.firstname,
          othernames: sig.othernames,
          mothersMaidenName: sig.mothersMaidenName,
          gender: sig.gender,
          nationality: sig.nationality,
          residentialPermit: sig.residentialPermit,
          meansOfIdentification: sig.meansOfIdentification,
          idNumber: sig.idNumber,
          dateOfBirth: isDate(sig.dateOfBirth)
            ? new Date(sig.dateOfBirth)
            : new Date(), //TODO fix the date
          idIssueDate: isDate(sig.idIssueDate)
            ? new Date(sig.idIssueDate)
            : new Date(),
          idExpiryDate: isDate(sig.idExpiryDate)
            ? new Date(sig.idExpiryDate)
            : new Date(),
          occupation: sig.occupation,
          city: sig.city,
          jobTitle: sig.jobTitle,
          residentialAddress: sig.residentialAddress,
          primaryPhoneNumber: sig.primaryPhoneNumber,
          secondaryPhoneNumber: sig.secondaryPhoneNumber,
          nearestLandmark: sig.nearestLandmark,
          email: sig.email,
          mmda: sig.mmda,
          region: sig.region,
          classOfSignatory: sig.classOfSignatory,
        };

        managementInfo.signitory.push(_sign);
      }
    }

    if (
      data?.newManagementInfoList &&
      data?.newManagementInfoList.additionalDetails
    ) {
      //lood through additional details and do same
      for (const add of data?.newManagementInfoList?.additionalDetails) {
        const _data: IAdditionalDetails = {
          nameOfAffiliatedCompany: add.nameOfAffiliatedCompany,
          fullname: add.fullname,
          percentageHolding: add.percentageHolding,
          email: add.email,
          address: add.address,
          status: add.status,
          nationality: add.nationality,
          beneficiaries: add.beneficiaries,
          registrationCertificate: add.registrationCertificate,
          mobileNumber: add.mobileNumber,
          countryOfIncoporation: add.countryOfIncoporation,
        };

        managementInfo.additionalDetails.push(_data);
      }
    }

    if (data?.newManagementInfoList && data?.newManagementInfoList.directors) {
      for (const dir of data?.newManagementInfoList?.directors) {
        const _data: IDirector = {
          surname: dir.surname,
          firstname: dir.firstname,
          othernames: dir.othernames,
          mothersMaidenName: dir.mothersMaidenName,
          gender: dir.gender,
          nationality: dir.nationality,
          residentialPermit: dir.residentialPermit,
          residentialAddress: dir.residentialAddress,
          meansOfIdentification: dir.meansOfIdentification,
          idNumber: dir.idNumber,
          dateOfBirth: isDate(dir.dateOfBirth)
            ? new Date(dir.dateOfBirth)
            : new Date(),
          idIssueDate: isDate(dir.idIssueDate)
            ? new Date(dir.idIssueDate)
            : new Date(),
          idExpiryDate: isDate(dir.idExpiryDate)
            ? new Date(dir.idExpiryDate)
            : new Date(),
          occupation: dir.occupation,
          city: dir.city,
          jobTitle: dir.jobTitle,
          primaryPhoneNumber: dir.primaryPhoneNumber,
          secondaryPhoneNumber: dir.secondaryPhoneNumber,
          nearestLandmark: dir.nearestLandmark,
          email: dir.email,
          mmda: dir.mmda,
          region: dir.region,
          statusAsDirector: dir.statusAsDirector,
        };

        managementInfo.directors.push(_data);
      }
    }

    // Digital Channels Info

    if (data?.channelsInfo && data?.channelsInfo.channel) {
      digitalChannels.channel =
        data?.channelsInfo.channel.split(',').map((val) => val.trim()) || [];
    }

    if (data?.channelsInfo && data?.channelsInfo.comments) {
      digitalChannels.comments = data?.channelsInfo.comments || '';
    }
    if (data?.channelsInfo && data?.channelsInfo.functionality) {
      digitalChannels.functionality =
        data?.channelsInfo.functionality.split(',').map((val) => val.trim()) ||
        [];
    }

    if (data?.channelsInfo && data?.channelsInfo.autorisers) {
      digitalChannels.autorisers = data?.channelsInfo.autorisers || [];
    }

    if (data?.channelsInfo && data?.channelsInfo.capturers) {
      digitalChannels.capturers = data?.channelsInfo.capturers
        ?.split(',')
        .map((val) => val.trim());
    }

    if (data?.channelsInfo && data?.channelsInfo.bankUserData) {
      digitalChannels.bankUserData = data?.channelsInfo.bankUserData;
    }

    return {
      businessInfo: businessInfo,
      managementInfo: managementInfo,
      documentUploadInfo: documentUploadInfo,
      accountInfo: accountInfo,
      channelsInfo: digitalChannels,
    };
  }
}

export enum SAVE_STATE {
  SAVE = 'SAVE',
  SAVE_AND_EXIT = 'SAVE.EXIT',
  COMPLETE = 'COMPLETE',
}

export interface IRelationshipManager {
  staffId: string;
  name: string;
}

export interface IRelationshipManagerResponse {
  hostHeaderInfo: IHostHeaderInfo;
  rmsObjList: IRelationshipManager[];
}

export function packAsType(files: string[]) {
  const pack: IPickedFile[] = [];

  files.map((url, _index) => {
    //try cast the url as a URL
    const _url = new URL(url);
    // pick the search part of the url and split with &,
    const _name = _url ? _url.search.split('&') : [];
    //pick the filename from the last part after split with =

    let _filename = _index + '';

    if (_name.length > 0) {
      _filename = _name[_name.length - 1].split('=')[1];
    }
    //'filename=jixajyfqrcode_localhost.png'
    pack.push({
      name: _filename,
      isUploaded: true,
      url: url,
      file: null,
    });
  });

  return pack;
}
