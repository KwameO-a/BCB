import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PROGRESS_STATE } from 'src/app/shared/constants/app.constants';
import { ILink } from 'src/app/shared/models/link.model';
import { APIService } from 'src/app/shared/services/api.service';
import { TableControllerService } from 'src/app/shared/services/paging-controller.service';
import { environment } from 'src/environments/environment';


export interface uploadDetails{
  title : string
}

@Component({
  selector: 'app-add-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class AddReviewComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  panelOpenState = false;

  managementDetails = [1,];

  PAGE_STATE: PROGRESS_STATE = PROGRESS_STATE.DONE;
  PROGRESS = PROGRESS_STATE;

  

  @Output() navigateBack =  new EventEmitter<number>();
  constructor(
    private pager: TableControllerService,
    private api: APIService,
    private _formBuilder: UntypedFormBuilder,

  ) {

  }

  ngAfterViewChecked() {

  }


  ngOnInit(): void {
   
  }


  links: ILink[] = []

  removeManager(index : number){
    this.managementDetails = this.managementDetails.filter((elem, position)=> position != index)
  }

  addNewManager(){
    this.managementDetails.push(1)
  }


  completeApplication(){
    this.PAGE_STATE = this.PROGRESS.COMPLETE
  }

  navigateTo(position : number){
    this.navigateBack.emit(position)
  }
}
