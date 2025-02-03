import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IRole } from '../models/login.model';


@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor(
    private router: Router,
  ) { }




  

  navigateToDashboard() {
    this.router.navigate([`/services`]);
  }

  navigateToLogin() {
    this.router.navigateByUrl(`/login`)
  }

  navigateToServices() {
    this.router.navigateByUrl(`/services`)
  }
  


  /**
   * Navigates to any specified URL
   * @param url 
   */
  navigateTo(url : string) {
    this.router.navigateByUrl(url)
  }


}
