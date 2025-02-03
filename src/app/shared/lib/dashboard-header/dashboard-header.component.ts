import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PACKAGE_TYPES } from '../../constants/app.constants';
import { IRequirement } from '../../models/requirements.model';
import { AuthService } from '../../services/auth.service';
import { EmitEvent, EventBusService, Events } from '../../services/event-bus.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardHeaderComponent implements OnInit {

  assetUrl = environment.assetsUrl;

  @Input() title = "Stanbic Bank"
  @Input() toggleSave = true

  //@ts-ignore
  accountData : IRequirement = null;
  PACKAGE_TYPES_LIST = PACKAGE_TYPES


  
  constructor(
    private route: ActivatedRoute,
    public authService : AuthService,
    private readonly eventBusService: EventBusService,

  ) {


    
   }

  ngOnInit(): void {
    
  }


  saveAndExit(){
    this.eventBusService.emit(new EmitEvent(Events.SAVE_AND_EXIT, {
      type: "Save and Exit application"
    }));
  }
}
