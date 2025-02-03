import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatLegacyButton as MatButton } from '@angular/material/legacy-button';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ButtonComponent extends MatButton implements OnInit {

  @Input() width: string = "127px";
  @Input() height: string = "47px";
  @Input() backgroundColor: string = "linear-gradient(93.67deg, #0064FC 1.23%, #0033AA 58.64%);"
  @Input() textColor: string = "white"
  @Input() borderRadius: string = "2px"
  @Input() border: string = "0.5 px solid black"
  @Input() marginleft : string = ""
  @Input() marginright : string = ""

  @Output() trigger = new EventEmitter();
  
  //@ts-ignore
  @ViewChild('buttonSelector') el:ElementRef;


  ngOnInit(): void {
    // this.el.nativeElement.style.borderRadius =  this.borderRadius;
  }


  clicked() {
    this.trigger.emit()
  }

}
