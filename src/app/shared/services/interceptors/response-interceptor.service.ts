import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse, HttpErrorResponse }   from '@angular/common/http';
import { Injectable } from "@angular/core"
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { AppConstant } from '../../constants/app.constants';
import { NavigationService } from '../navigation.service';
import { NotificationService } from '../notification.service';
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(
        public notification : NotificationService,
        public navigation : NavigationService) {}
intercept(
        req: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
    
        return next.handle(req).pipe(
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if(evt.body && (evt.body.hostHeaderInfo && evt.body.hostHeaderInfo.responseCode ==="E401") ){
                        //store the current url & navigate to login
                            this.navigation.navigateToLogin();  
                            this.notification.openSnackBar("Your session has expired, Please login",AppConstant.DISMISS);
                    }      
                }
                
                return evt;
            }),
            catchError((err: any) => {

                if(err instanceof HttpErrorResponse) {
                    try {
                        this.notification.openSnackBar(err.error, err.statusText);
                    } catch(e) {
                        this.notification.openSnackBar('An error occurred', '',);
                    }
                    //log error 
                }
                return of(err);
            }));
    
      }
      
}