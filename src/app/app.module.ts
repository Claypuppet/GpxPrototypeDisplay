import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {MAT_DATE_LOCALE, MatButtonModule, MatIconModule} from '@angular/material';

import {SharedModule} from '@core/shared.module';

import {AppComponent} from './app.component';

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

    // Material
    MatButtonModule,
    MatIconModule,

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
