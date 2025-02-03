import { IHostHeaderInfo } from './host-header-info.model';

export interface ILoginModel {
  username: string;
  password: string;
}


export interface IClientPasswordSetup {
  confirmPassword: string;
  password: string;
}


export interface ILoginResponse {
  hostHeaderInfo: IHostHeaderInfo,
  token: string,
  validity: string,
  staffInfo: IStaffInfo
  role: IRole[]
}

export interface IStaffInfo {
  firstName: string,
  lastName: string,
  email: string,
  jobtitle: string,
  department: string,
  deptCode: string,
  mobile: string,
  employeeNumber: string,
  employeeType: string,
  address: string,
  manager: string,
  managerSap: string,
  staffNo: string,
  grade: string,
  costCenter: string,
  dbBranch: string,
}

export interface IRole {
  app: string,
  role: string,
  url: string,
  dashboardName: string,
  icon: string,
}