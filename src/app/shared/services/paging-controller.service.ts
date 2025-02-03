import { Injectable } from '@angular/core';
import { REQUEST_STATE } from '../constants/app.constants';
import { ITablePageController, TablePageController } from '../models/paging.model';


@Injectable({
  providedIn: 'root'
})
export class TableControllerService {


  currentState = REQUEST_STATE.ALL;
  pageController : ITablePageController;

  constructor(){
    this.pageController = new TablePageController()
  }


  updateInfo(state : REQUEST_STATE, currentPage : number, totalItems : number){

    this.currentState = state;

    if(state === REQUEST_STATE.ALL){
      this.pageController.all.currentPage = currentPage;
      this.pageController.all.totalItems = totalItems;
    }else if(state === REQUEST_STATE.REJECTED){
      this.pageController.rejected.currentPage = currentPage;
      this.pageController.rejected.totalItems = totalItems;
    }else if(state === REQUEST_STATE.AUTHORISED){
      this.pageController.completed.currentPage = currentPage;
      this.pageController.completed.totalItems = totalItems;
    }else if(state === REQUEST_STATE.PENDING_APPROVAL){
      this.pageController.active.currentPage = currentPage;
      this.pageController.active.totalItems = totalItems;
    }
  }


  getPageInfo(state : REQUEST_STATE = REQUEST_STATE.ALL){
    if(state === REQUEST_STATE.PENDING_APPROVAL){
      return this.pageController.active;
    }else if(state === REQUEST_STATE.REJECTED){
      return this.pageController.rejected;
    }else if(state === REQUEST_STATE.AUTHORISED){
      return this.pageController.completed;
    }
    else{
      return this.pageController.all;
    } 
  }
  

  updateState(state : REQUEST_STATE){
      this.currentState = state;
  }
}
