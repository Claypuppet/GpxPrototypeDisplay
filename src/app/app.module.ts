import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MAT_DATE_LOCALE, MatButtonModule, MatIconModule, MatCardModule, MatProgressBarModule, MatSlideToggleModule} from '@angular/material';

import {SharedModule} from '@core/shared.module';

import {AppComponent} from './app.component';
import { FlexLayoutModule } from '@angular/flex-layout';

const appRoutes: Routes = [
  {
    path: '',
    component: AppComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FlexLayoutModule,

    // Material
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSlideToggleModule

  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'nl-NL'},
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
