import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { IRequirement } from 'src/app/shared/models/requirements.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard-subheader',
  templateUrl: './dashboard-subheader.component.html',
  styleUrls: ['./dashboard-subheader.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardSubHeaderComponent implements OnInit {
  //@ts-ignore
  @Input() requirement: IRequirement = null;

  @Input() position = 0;
  @Input() totalSteps = 0;
  @Input() head_title = 'Business Details';

  //@ts-ignore
  @Input() state: {
    businessInfoComplete: boolean;
    managementInfoComplete: boolean;
    digitalChannelsInfoComplete: boolean;
    accountInfoComplete: boolean;
    documentUploadInfoComplete: boolean;
  };
  @Output() stateChange = new EventEmitter();
  ngOnInit(): void {}

  assetUrl = environment.assetsUrl;

  updateSelectedIndex(data: any) {}
  ngAfterViewChecked() {}
}
