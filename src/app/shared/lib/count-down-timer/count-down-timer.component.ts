import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-count-down-timer',
  templateUrl: './count-down-timer.component.html',
  styleUrls: ['./count-down-timer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CountDownTimerComponent implements OnInit {

  
  //@ts-ignore
  private subscription: Subscription;
  
  public dateNow = new Date();
  public dDay = new Date();
  
  @Input() duration : number = 300000;
  @Input() textColor : string = "#374A67";
  @Input() fontSize : string = "19px";

  @Output() timerReached = new EventEmitter();
  
  milliSecondsInASecond = 1000;
  hoursInADay = 24;
  minutesInAnHour = 60;
  SecondsInAMinute  = 60;

  public timeDifference  =0;
  public secondsToDday = 0;
  public minutesToDday = 0;
  public hoursToDday = 0;
  public daysToDday = 0;


  constructor(){
    this.dDay.setMilliseconds(this.duration);
  }

  private getTimeDifference () {
      this.timeDifference = this.dDay.getTime() - new  Date().getTime();
      this.allocateTimeUnits(this.timeDifference);

      if(this.secondsToDday <= 0 && this.minutesToDday <=0 && this.hoursToDday <= 0 && this.daysToDday <=0 ){
        this.subscription.unsubscribe();
        this.timerReached.emit();                                                                                                                                                                                                                                                                                                                                                     
      }
  }

private allocateTimeUnits (timeDifference : number) {
      this.secondsToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond) % this.SecondsInAMinute);
      this.minutesToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour) % this.SecondsInAMinute);
      this.hoursToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute) % this.hoursInADay);
      this.daysToDday = Math.floor((timeDifference) / (this.milliSecondsInASecond * this.minutesInAnHour * this.SecondsInAMinute * this.hoursInADay));
}

  ngOnInit() {
     this.subscription = interval(1000)
         .subscribe(x => { this.getTimeDifference(); });
  }

 ngOnDestroy() {
    this.subscription.unsubscribe();
 }

}
