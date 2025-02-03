import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-failed-loading',
  templateUrl: './failed-loading.component.html',
  styleUrls: ['./failed-loading.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class FailedLoadingComponent implements OnInit {

  @Input() message = "Failed";
  @Output() trigger = new EventEmitter();
  constructor(
    private navigation :NavigationService
  ) { }

  ngOnInit(): void {
  }


  tryAgain(){

  }

}
