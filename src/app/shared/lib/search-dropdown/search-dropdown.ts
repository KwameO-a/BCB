import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
  Output,
  EventEmitter,
  ViewChild
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";
@Component({
  selector: "app-search-dropdown",
  templateUrl: "./search-dropdown.html",
  styleUrls: ["./search-dropdown.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchDropdown),
      multi: true
    }
  ]
})
export class SearchDropdown implements ControlValueAccessor {
  list = [];
  temp_list = [];
  keyword = "";
  _img: any;
  _label: any;
  _uid: any;
  
  //if an item is selected, place it back in the 
  _selected : any;

  @Output() afterChange = new EventEmitter();

  // @ts-ignore
  @ViewChild("input", { static: false }) input: ElementRef;

  @Input("size") size = 'small';

  @Input("items") set items(value: any) {
    this.list = value;
    this.temp_list = value;

 }

  // @ts-ignore
  // @Input("img") img;

  @Input("label") label = 'name';

  @Input("uid") uid = "id";
  @Input("placeholder") value: any = "Select";


  // @ts-ignore
  @Input("selected") set selected(item : any){
    this._selected = item;
  }


  onChange: any = () => { };
  onTouch: any = () => { };

  shown = false;

  constructor(private ele: ElementRef) {

 
  }

  ngOnInit(): void {
   
  }

  ngAfterContentInit() {
    if(this._selected){
        //find the item based on the id
        const found = (this.list as []).find((val : any)=> val[this._uid] === this._selected)
        //call  select to fix it
        if(found) this.select(found);
    }
  }
  ngOnChanges() {
    this._label = (typeof this.label !== 'undefined' && this.label !== '') ? this.label : 'name';
    // this._img = (typeof this.img !== 'undefined' && this.img !== '') ? this.img : 'img';
    this._uid = (typeof this.uid !== 'undefined' && this.uid !== '') ? this.uid : 'id';
    this.value = this.value || 'Select';
  }

  writeValue(value: any) {
    if (value) {
      this.temp_list.map(x => {
        if (x[this._uid] == value) {
          this.value = x[this._label];
        }
      })
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }


  search(e: any) {
    const val = e.toLowerCase();
    const temp = this.temp_list.filter((x: any) => {

      if (x[this._label].toLowerCase().indexOf(val) !== -1 || !val) {
        return x;
      }
    });

    this.list = temp || [];
  }


  select(item: any) {
    this.onChange(item[this._label]);
    this.value = item[this._label];
    this.shown = false;
    this.afterChange.emit(item);
  }

  show(event: any) {

    event.stopPropagation();
    this.shown = this.shown ? false : true;


    setTimeout(() => {
      this.input.nativeElement.focus();

    }, 200);
  }

  @HostListener("document:click", ["$event"]) onClick(e: any) {
    if (!this.ele.nativeElement.contains(e.target)) {
      this.shown = false;
    }
  }
}
