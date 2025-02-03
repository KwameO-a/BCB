import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationComponent } from './authentication.component';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AuthenticationComponent,
  ],
  imports: [
    CommonModule,
    RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    MaterialModule,

  ]
})
export class AuthenticationModule { }
