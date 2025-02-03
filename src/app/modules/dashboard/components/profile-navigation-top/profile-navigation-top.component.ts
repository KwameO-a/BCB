import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-navigation-top',
  templateUrl: './profile-navigation-top.component.html',
  styleUrls: ['./profile-navigation-top.component.scss']
})
export class ProfileNavigationTopComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  @Input() title: string = "Back";
  @Input() url: string = "/";

  constructor() { }

  ngOnInit(): void {
  }
}
