import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IPickedFile, IRelationshipManagerResponse, ISaveClientInfoRequest, IUserAccountInfoResponse, MultipleFileUploadResponse, UserAccountInfoResponse } from '../models/account.model';
import { IGenerateOTPResponse } from '../models/authentication.model';
import { IBranchesResponse } from '../models/branches.model';
import { ICategory } from '../models/categories.model';
import { ILink, ILinkResponse } from '../models/link.model';
import { AuthService } from './auth.service';
import { TableControllerService } from './paging-controller.service';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private baseURL = environment.appUrl;
  private validateTinUrl =`${this.baseURL}/tin`;
  private baseUrlOTP = `${this.baseURL}/proxy/v2/otpgenerate`;
  private authenticateUrl = `${this.baseURL}/proxy/v2/login`;
  private saveClientInfoUrl = `${this.baseURL}/api/v1/forms/business`;
  private getClientDataUrl = `${this.baseURL}/api/v1/forms/business`;
  private sendEmailVerificationUrl = `${this.baseURL}/proxy/v2/verification-mail`;
  private verifyEmailTokenURM = `${this.baseURL}/proxy/v2/verify-client-mail`;
  private branchesUrl = `${this.baseURL}/proxy/v2/list-available-branches`;
  private countriesUrl = `${this.baseURL}/proxy/v2/countries`;
  private relationshipManagers = `${this.baseURL}/api/v1/forms/business/rms?segment=all`;


  private httpHeaders = new HttpHeaders()
    .set("Content-Type", "application/json")
    .set("sourceCode", environment.app)
    .set("Access-Control-Allow-Origin", "*")
    .set("Content-Security-Policy", "script-src 'self'")
    .set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT")
    .set(
      "X-IBM-Client-Secret",
      "jE1yI1pS6rP0kX1xT2pP3hQ6bY7mX1jJ3rW2xR8lN0hM7wX7tH"
    )
    .set("requestToken", "jE1yI1pS6rP0kX1xT2pP3hQ6bY7mX1jJ3rW2xR8lN0hM7wX7tH")
    .set("X-IBM-Client-Id", "25bea38f-8aa5-4f7b-b50b-b9ab6ea6c830")
    .set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    .set("Content-Type", "application/json")
    .set("sourceCode", environment.app)
    .set("countryCode", environment.countryCode)
    .set("X-User-Type", "Staff")
    .set("Cache-Control", "no-cache");

  constructor(
    private http: HttpClient,
    private auth : AuthService,
    private page : TableControllerService
  ) { }



  getBranches() {
    return this.http.get<IBranchesResponse>(this.branchesUrl, { headers: this.httpHeaders });
  }

  validateTin(tin : string){
    const httpHeaders = new HttpHeaders()
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Accept', '*/*');

    const body = new URLSearchParams();
    body.set('tin', tin);
    return this.http.post(this.validateTinUrl, body, {
      headers: httpHeaders,
    });
  }

  saveClientInfo(data: ISaveClientInfoRequest) {
    
    const token = this.auth.getCurrentToken();

    const httpOptions = {
      headers: {
        ...this.httpHeaders,
        "Authorization": `Bearer ${token}`
      }
    };

    const headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${token}`
    );
   return this.http.post<any>(this.saveClientInfoUrl,data, {
      headers: headers,
    });
  }


  getClientInfo() {
    
    const token = this.auth.getCurrentToken();


    const headers = this.httpHeaders.set(
      'Authorization',
      `Bearer ${token}`
    );
  return  this.http.get<IUserAccountInfoResponse>(this.saveClientInfoUrl, {
      headers: headers,
    });
  }


    /*
   * Get RMS
   */
    getRelationshipManagers() {

      const token = this.auth.getCurrentToken();


      const headers = this.httpHeaders.set(
        'Authorization',
        `Bearer ${token}`
      );

      return this.http.get<IRelationshipManagerResponse>(this.relationshipManagers, {
        headers: headers,
      });
    }
}



