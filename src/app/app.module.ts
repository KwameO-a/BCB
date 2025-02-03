import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { AuthService } from './shared/services/auth.service';
import { NavigationService } from './shared/services/navigation.service';
import { StateStorageService } from './shared/services/state-storage.service';
import { RoleGuardService } from './shared/services/role-guard.service';
import { NotificationService } from './shared/services/notification.service';
import { TableControllerService } from './shared/services/paging-controller.service';
import { EventBusService } from './shared/services/event-bus.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AppHttpInterceptor } from './shared/services/interceptors/response-interceptor.service';
import { WizardService } from './shared/services/wizard.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { UploadService } from './shared/services/upload.service';
import { APIService } from './shared/services/api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [
    APIService,
    AuthService,
    UploadService,
    NavigationService,
    StateStorageService,
    AuthGuardService,
    JwtHelperService,
    RoleGuardService,
    NotificationService,
    TableControllerService,
    WizardService,
    EventBusService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    // {
    //   provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
