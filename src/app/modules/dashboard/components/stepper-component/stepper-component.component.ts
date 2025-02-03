import { ChangeDetectorRef,ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { CdkStep, CdkStepper } from '@angular/cdk/stepper';
import { Directionality } from '@angular/cdk/bidi';
import { environment } from 'src/environments/environment';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-stepper-component',
  templateUrl: './stepper-component.component.html',
  styleUrls: ['./stepper-component.component.scss'],
  providers: [{ provide: CdkStepper, useExisting: CDKProgressStepper }],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class CDKProgressStepper extends CdkStepper implements OnInit {

  assetUrl = environment.assetsUrl;

  //@ts-ignore
  @ViewChild('stepper') stepper;

  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  @Output() emitCurrentState = new EventEmitter();

  constructor(
   private dir: Directionality,
    private changeDetectorRef: ChangeDetectorRef,
     _elementRef: ElementRef<HTMLElement>
     ) {
    super(dir, changeDetectorRef, _elementRef)
  }

  //@ts-ignore
  selectedStep : CdkStep = null
  ngAfterViewChecked() {

    if (this.value >= 0 && this.value < this.steps.length) {
      this.selectStepByIndex(this.value);
    }

    this.emitCurrentState.emit(this.selectedIndex);

    if(this.selected) this.selectedStep = this.selected;

    this.changeDetectorRef.detectChanges();

  }

  ngOnInit(): void {
  }

  selectStepByIndex(index: number): void {
    this.selectedIndex = index;


  }


  setStepperPosition(i: number) {
    // this.selectedIndex = i;
    this.value = i;
    this.selectStepByIndex(i);
  }
}
