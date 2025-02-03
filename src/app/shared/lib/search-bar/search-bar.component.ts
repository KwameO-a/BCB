import { Component, ElementRef, HostListener, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBarComponent implements OnInit {

  showSearch: boolean = false;
  showFilter: boolean = false;

  constructor(private ele: ElementRef) {

  }

  ngOnInit(): void {
  }

  openSearchDrawer() {
    this.showSearch = true;
    this.showFilter = false;

  }

  closeSearchDrawer() {
    // this.showSearch = false;

  }


  @HostListener("document:click", ["$event"]) onClick(e: any) {
    if (!this.ele.nativeElement.contains(e.target)) {
      this.showFilter = false;
      // this.showSearch = false;
    }
  }
}
