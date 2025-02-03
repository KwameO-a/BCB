import { Component, Input, OnInit } from '@angular/core';
import { ILink } from 'src/app/shared/models/link.model';
import { environment } from 'src/environments/environment';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-link-card',
  templateUrl: './link-card.component.html',
  styleUrls: ['./link-card.component.scss']
})
export class LinkCardComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  //@ts-ignore
  @Input() link: ILink = null;

  constructor(
    private clipboard: Clipboard
  ) { }

  ngOnInit(): void {
  }

  updateFavorite() {
    //update api with liked link
    this.link.liked = !this.link.liked;
  }

  copyLink() {
    this.clipboard.copy(this.link.url)
  }

  openLink() {
    window.open(this.link.url, "_blank");
  }
}
