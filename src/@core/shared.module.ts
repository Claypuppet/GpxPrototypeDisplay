import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatTooltipModule,
  MatMenuModule,
  MatTabsModule,
} from '@angular/material';

@NgModule({
  imports: [
    RouterModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ],
  exports: [
    RouterModule,

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    // Material design
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule,
  ],
  providers: [
  ],
})
export class SharedModule {
}
