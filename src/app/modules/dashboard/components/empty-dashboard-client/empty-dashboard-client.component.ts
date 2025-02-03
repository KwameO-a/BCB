import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-empty-dashboard-client',
  templateUrl: './empty-dashboard-client.component.html',
  styleUrls: ['./empty-dashboard-client.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EmptyClientDashboardComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit(): void {
  }


  newResquest() {
  }

}
