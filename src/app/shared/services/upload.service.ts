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
export class UploadService {

  private baseURL = environment.uploadUrl;
  
  // tslint:disable-next-line:max-line-length
  private httpHeadersFile = new HttpHeaders()
    .set('countryCode', 'GH')
    .set('X-User-Type', 'Guest')
    .set('sourceCode', 'account opening') //change to account opening
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    .set(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Tye, Accept, Authorization'
    );



  constructor(
    private http: HttpClient,
    private auth : AuthService,
    private page : TableControllerService
  ) { }


  multipleFileUpload(files: IPickedFile[]) {
    const options = { headers: this.httpHeadersFile };

    var data = new FormData();

    files.forEach((v) => {
      if (v.file) {
        data.append('file', v.file, (v.file as File).name);
      }
    });

    return this.http.post(
      this.baseURL +
        '/FileServices/File/upload/multiple?documenttype=simsOnboarding',
      data,
      options
    ) as Observable<MultipleFileUploadResponse>;
  
  }


}



