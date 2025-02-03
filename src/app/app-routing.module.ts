import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardModule} from "./modules/dashboard/dashboard.module"
import { AuthGuardService } from './shared/services/auth-guard.service';

const routes: Routes = [


  {
    path: 'login',
    loadChildren: () =>
      import('./modules/authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: '',
    data: {
      expectedRole: []
    },
    loadChildren: () =>
      import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  { path: "**", pathMatch: "prefix", redirectTo: "" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
