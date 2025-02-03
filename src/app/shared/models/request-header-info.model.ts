import { environment } from "src/environments/environment"
import { v4 as uuidv4 } from 'uuid';

export interface IRequestHeaderInfo {
  sourceCode: string,
  requestId: string,
  countryCode: string,
  requestToken: string
}


export class RequestHeaderInfo implements IRequestHeaderInfo {

  constructor(
    public requestId: string,

  ) {

    this.sourceCode = environment.app
    this.requestToken = "";
    this.countryCode = environment.countryCode;
    this.requestId = this.requestId.split("-").join("");
  }
  sourceCode: string;
  countryCode: string;
  requestToken: string;


  static Instance(): RequestHeaderInfo {
    const request = new RequestHeaderInfo(uuidv4());
    request.sourceCode = environment.app;
    request.countryCode = environment.countryCode;
    request.requestToken = request.requestId;
    return request;
  }
}