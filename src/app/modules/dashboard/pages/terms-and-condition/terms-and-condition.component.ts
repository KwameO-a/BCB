import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ILink } from 'src/app/shared/models/link.model';
import { APIService } from 'src/app/shared/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionPageComponent implements OnInit {

  assetUrl = environment.assetsUrl;
  src = this.assetUrl + "/assets/files/Terms.pdf";

  constructor(
    private api: APIService,
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private activatedroute: ActivatedRoute,
    private route: ActivatedRoute,
  ) {

    const requestId = this.route.snapshot.paramMap.get('id') || "";

    if (requestId === "declaration") {
      this.src = this.assetUrl + "/assets/files/Declaration.pdf";
    } else {
      this.src = this.assetUrl + "/assets/files/Terms.pdf";
    }
  }

  ngOnInit(): void {
    // if (this.data.type === "terms") {
    //   this.src = "assets/files/Terms.pdf";
    // } else {
    //   this.src = "assets/files/Declaration.pdf";
    // }
  }
}
