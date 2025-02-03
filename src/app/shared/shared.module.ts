import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SearchDropdownModule } from './lib/search-dropdown/search-dropdown.module';
import { ButtonComponent } from './lib/button/button.component';
import { DashboardContainerComponent } from './lib/dashboard-container/dashboard-container.component';
import { DashboardContentContainerComponent } from './lib/dashboard-content-container/dashboard-content-container.component';
import { DashboardHeaderComponent } from './lib/dashboard-header/dashboard-header.component';
import { EmptyDashboardComponent } from './lib/empty-dashboard/empty-dashboard.component';
import { MainContentContainerComponent } from './lib/main-content-container/main-content-container.component';
import { SearchBarComponent } from './lib/search-bar/search-bar.component';
import { SideNavContainerComponent } from './lib/side-nav-container/side-nav-container.component';
import { FailedLoadingComponent } from './lib/failed-loading/failed-loading.component';
import { CountDownTimerComponent } from './lib/count-down-timer/count-down-timer.component';


@NgModule({
  declarations: [
    ButtonComponent,
    DashboardContainerComponent,
    DashboardContentContainerComponent,
    DashboardHeaderComponent,
    EmptyDashboardComponent,
    MainContentContainerComponent,
    SearchBarComponent,
    SideNavContainerComponent,
    FailedLoadingComponent,
    CountDownTimerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SearchDropdownModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [
    ButtonComponent,
    DashboardContainerComponent,
    DashboardContentContainerComponent,
    DashboardHeaderComponent,
    EmptyDashboardComponent,
    MainContentContainerComponent,
    SearchBarComponent,
    SideNavContainerComponent,
    FailedLoadingComponent,
    CountDownTimerComponent,

  ]
})
export class SharedModule { }
