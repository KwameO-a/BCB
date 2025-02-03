import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-side-nav-container',
  templateUrl: './side-nav-container.component.html',
  styleUrls: ['./side-nav-container.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SideNavContainerComponent implements OnInit {

  @Input() isMobile: boolean = false;
  @Input() opened: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
