import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  PACKAGE_TYPES,
  PROGRESS_STATE,
} from 'src/app/shared/constants/app.constants';
import {} from 'src/app/shared/models/login.model';
import { ITablePageController } from 'src/app/shared/models/paging.model';
import { APIService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import {
  EventBusService,
  Events,
} from 'src/app/shared/services/event-bus.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { TableControllerService } from 'src/app/shared/services/paging-controller.service';
import { environment } from 'src/environments/environment';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  REQUIREMENTS_DATA = PACKAGE_TYPES;

  PAGE_STATE: PROGRESS_STATE = PROGRESS_STATE.DONE;
  PROGRESS = PROGRESS_STATE;
  assetUrl = environment.assetsUrl;
  pageController: ITablePageController;

  status = true;
  wizard = false;

  activeItem: any = null;

  //subscribes to the save and exot button
  _eventBusSub: Subscription;

  constructor(
    private pager: TableControllerService,
    private api: APIService,
    private _formBuilder: UntypedFormBuilder,
    private readonly eventBusService: EventBusService,
    private navigationService: NavigationService,
    private authService: AuthService
  ) {
    this.pageController = this.pager.pageController;

    this._eventBusSub = this.eventBusService.on(
      Events.SAVE_AND_EXIT,
      (data: any) => {
        this.authService.logout();
        this.navigationService.navigateToLogin();
      }
    );
  }

  ngAfterViewChecked() {
    this.pageController = this.pager.pageController;
  }

  ngOnInit(): void {}

  expandTile(item: any) {
    this.activeItem = item;
  }

  shrinkTile(item: any) {
    if (this.activeItem === item) {
      this.activeItem = null;
    }
  }

  /**Destroy the subscription on the event bus, this will prevent multiple request */
  ngOnDestroy() {
    if (this._eventBusSub) {
      this._eventBusSub.unsubscribe();
    }
  }
}
