import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/services/auth-guard.service';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/home/services/services.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { TermsAndConditionPageComponent } from './pages/terms-and-condition/terms-and-condition.component';
import { AddAccountComponent } from './pages/add-account/add-account.component';

const routes: Routes = [
  {path :"welcome", component : LandingPageComponent},
  {path :"terms/:id", component : TermsAndConditionPageComponent},
  {path :"terms", component : TermsAndConditionPageComponent},

  {
    canActivate:[AuthGuardService],
    path: '', component: HomeComponent,
    children:[
      {path : "services", component : ServicesComponent},
      {path : "add-account/:id", component : AddAccountComponent},
      {path : "",pathMatch: "prefix", redirectTo: "/welcome"},
    ]
  },
  { path: "**", pathMatch: "prefix", redirectTo: "welcome" },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule { }
