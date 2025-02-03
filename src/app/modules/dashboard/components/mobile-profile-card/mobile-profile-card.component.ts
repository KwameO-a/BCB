import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mobile-profile-card',
  templateUrl: './mobile-profile-card.component.html',
  styleUrls: ['./mobile-profile-card.component.scss']
})
export class MobileProfileCardComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  constructor() { }

  ngOnInit(): void {
  }
}
