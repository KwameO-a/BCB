import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILink } from 'src/app/shared/models/link.model';
import { APIService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  assetUrl = environment.assetsUrl;
  links: ILink[] = []

  mobileState = true;
  toggleMobile = false;
  
  constructor(
    private api: APIService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedroute: ActivatedRoute,
  ) {

        // detect screen size changes
        this.breakpointObserver.observe([
          "(max-width: 767px)"
        ]).subscribe((result: BreakpointState) => {
          if (result.matches) {
            // hide stuff  
            this.toggleMobile = true;
            this.mobileState = false;
          } else {
            // show stuff
            this.toggleMobile = false;
            this.mobileState = true;
          }
        });
    
   }

  ngOnInit(): void {
    
    

  }
}
