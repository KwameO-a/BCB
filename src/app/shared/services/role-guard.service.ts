import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';

import decode from 'jwt-decode';
import { IRole } from '../models/login.model';
import { AuthService } from './auth.service';
import { StateStorageService } from './state-storage.service';
@Injectable()
export class RoleGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    public store: StateStorageService
  ) { }
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // this will be passed from the route config
    // on the data property
    const expectedIRole: string[] = route.data['expectedRole'] as [];

    const token = this.auth.getCurrentToken();

    if (!token) {
      this.router.navigate(['login']);
    }


    // decode the token to get its payload
    const _role   = this.auth.getCurrentUserRole() as IRole;

    if(!_role) this.router.navigate(['login']);

    // const IRoles = ["MAKER", "CHECKER", ADMIN]
    /**
     * If the user is not authenticated and is not an ADMIN OR MAKER OR CHECKER
     * Navigate to the authentication
     */

    const roles = _role ? [_role] : [];

    if ( !this.auth.isAuthenticated() || ( !this.hasIRole(roles, expectedIRole[0]) )  ) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }


  hasIRole(userRoles: IRole[], expectedRole: string) {
    const roles = userRoles.filter((role) => role.role.toLowerCase() === expectedRole.toLowerCase());
    if (roles.length >= 1) {
      return true;
    }
    return false;
  }
}
