import { IHostHeaderInfo } from "./host-header-info.model"

export interface IGenerateOTPResponse {
  maskedReference : string
reference : string
timeout : number
hostHeaderInfo : IHostHeaderInfo
}

export interface IValidateOTPRequest{
  password : string
  username : string
}

export interface IValidateOTPResponse{
  hostHeaderInfo : IHostHeaderInfo
  refresh : string
  token : string
  validity : string
}

export interface IOTPDialog{
  otp : string

}

export interface IOTPDialogRequest extends IOTPDialog{
}

export interface IOTPDialogRespons extends IOTPDialog{
}

export interface IOTP{
  code1 : string,
  code2 : string,
  code3 : string,
  code4 : string,
  code5 : string,
}

export class OTP implements IOTP{

  constructor(
  public code1: string,
  public code2: string,
  public code3: string,
  public code4: string,
  public code5: string
  ){
    
  }
  

}