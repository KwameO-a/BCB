import { Injectable } from '@angular/core';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { StateStorageService } from './state-storage.service';

@Injectable({
  providedIn: 'root'
})
export class WizardService {

  WIZARD_SETUP = "wizard";
  constructor(
    private storageService : StateStorageService
  ){

  }

  defaultSettings(){
    this.storageService.store<boolean>(this.WIZARD_SETUP, false);
  }

  checkIfWizardClosed(){
     return this.storageService.get<boolean>(this.WIZARD_SETUP) || false;
  }

  wizardClosed(){
    this.storageService.store<boolean>(this.WIZARD_SETUP, true);
  }

  wizardExist(){
    return this.storageService.keyExist(this.WIZARD_SETUP);
  }
}
