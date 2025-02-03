import { Component, Input, OnInit } from '@angular/core';
import { ILink } from 'src/app/shared/models/link.model';
import { environment } from 'src/environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';
import { IRequirement } from 'src/app/shared/models/requirements.model';

@Component({
  selector: 'app-service-item',
  templateUrl: './service-item.component.html',
  styleUrls: ['./service-item.component.scss']
})
export class ServiceItemComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  //@ts-ignore
  @Input() item: IRequirement = null;
  @Input() active: boolean = false;

  constructor(
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
  }

  updateFavorite() {
    //update api with liked link
    // this.link.liked = !this.link.liked;
  }

  copyLink() {
    this.clipboard.copy(window.location.host+"/add-account/"+this.item.id)
  }

  openLink() {
    window.open(window.location.host+"/add-account/"+this.item.id, "_blank");
  }
}
