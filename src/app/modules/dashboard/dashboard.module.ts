import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { RoutingModule } from './routing.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchDropdownModule } from 'src/app/shared/lib/search-dropdown/search-dropdown.module';
import { MaterialModule } from 'src/app/material.module';
import { CategoriesFilterComponent } from './components/categories-filter/categories-filter.component';
import { LinkCardComponent } from "./components/link-card/link-card.component";
import { MiniCardComponent } from './components/mini-card/mini-card.component';
import { DashboardSubHeaderComponent } from './components/dashboard-subheader/dashboard-subheader.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { ServicesComponent } from './pages/home/services/services.component';
import { ServiceItemComponent } from './components/service-item/service-item.component';
import { CDKProgressStepper } from './components/stepper-component/stepper-component.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TermsDialogComponent } from './components/terms-dialog/terms-dialog.component';
import { DownloadFilesDialogComponent } from './components/download-files-dialog/download-files-dialog.component';
import { TermsAndConditionsDialogComponent } from './components/terms-and-conditions-dialog/terms-and-conditions-dialog.component';
import { TermsAndConditionPageComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';
import { AddAccountDetailsComponent } from './pages/add-account/account-details/account-details.component';
import { AddBusinessDetailsComponent } from './pages/add-account/business-details/business-details.component';
import { AddManagementDetailsComponent } from './pages/add-account/management-details/management-details.component';
import { AddDigitalChannelsComponent } from './pages/add-account/digital-channels/digital-channels.component';
import { AddDocumentUploadComponent } from './pages/add-account/documents-upload/documents-upload.component';
import { AddReviewComponent } from './pages/add-account/review/review.component';
import { RequiredDocumentsComponent } from './pages/add-account/required-documents/required-documents.component';
import { ApplicationCompleteComponent } from './pages/add-account/application-complete/application-complete.component';

@NgModule({
  declarations: [
    HomeComponent,
    CategoriesFilterComponent,
    LinkCardComponent,
    MiniCardComponent,
    DashboardSubHeaderComponent,
    LandingPageComponent,
    AddAccountComponent,
    ServicesComponent,
    AddAccountDetailsComponent,
    AddBusinessDetailsComponent,
    AddManagementDetailsComponent,
    AddDigitalChannelsComponent,
    AddDocumentUploadComponent,
    AddReviewComponent,
    ServiceItemComponent,
    CDKProgressStepper,
    RequiredDocumentsComponent,
    ApplicationCompleteComponent,
    FilePreviewComponent,
    TermsDialogComponent,
    DownloadFilesDialogComponent,
    TermsAndConditionsDialogComponent,
    TermsAndConditionPageComponent
  ],
  imports: [
    CommonModule,
    RoutingModule,
    MaterialModule,
    MatSidenavModule,
    SearchDropdownModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    PdfViewerModule
    ]
})
export class DashboardModule { }
