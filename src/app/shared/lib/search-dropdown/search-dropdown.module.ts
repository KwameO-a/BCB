import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { SearchDropdown } from './search-dropdown';

@NgModule({
  declarations: [SearchDropdown,],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [SearchDropdown],
  providers: []
})
export class SearchDropdownModule { }
