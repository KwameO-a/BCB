import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-empty-dashboard',
  templateUrl: './empty-dashboard.component.html',
  styleUrls: ['./empty-dashboard.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EmptyDashboardComponent implements OnInit {

  constructor(
    private navigation :NavigationService
  ) { }

  ngOnInit(): void {
  }


}
