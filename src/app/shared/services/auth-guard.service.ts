import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IRole } from '../models/login.model';
import { AuthService } from './auth.service';
import { NavigationService } from './navigation.service';
import { StateStorageService } from './state-storage.service';

/**
 * An authentication guard class heping the router module decide on
 * which pages the user can navigate to or not.
 *
 * @author botchway44
 */
@Injectable()
export class AuthGuardService implements CanActivate {

  /**
   *
   * @param auth {AuthService}
   * @param router Router
   * @param stateStorageService
   */
  constructor(
    public auth: AuthService,
    public router: Router,
    private stateStorageService: StateStorageService,
    private navigationService : NavigationService
    ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {

      this.stateStorageService.storeUrl(state.url);

      this.router.navigate(['/login']);

      return false;
    }

    return true;
  }

  
}
