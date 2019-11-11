import { Component, OnDestroy, OnInit } from '@angular/core';

import { MeterDataService } from '@core/services/meter-data.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { CollectedData } from '../@core/models';
import { MatSlideToggleChange } from '@angular/material';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject();
  meterData: CollectedData;

  constructor(private meterDataService: MeterDataService) {
  }

  ngOnInit(): void {
    this.meterDataService.meterData.pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      if (value) {
        this.meterData = value;
        console.log(value);
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  togglePanel(event: MatSlideToggleChange) {
    if (event.checked) {
      this.meterData.lommerd.meter.currentProduction = 20;
    } else {
      this.meterData.lommerd.meter.currentProduction = 0;
    }
  }

  toggleDazo(event: MatSlideToggleChange) {
    if (event.checked) {
      this.meterData.dazo.meter.currentConsumption = 10;
    } else {
      this.meterData.dazo.meter.currentConsumption = 0;
    }

  }

  get currentLommerdDelta() {
    return this.meterData.lommerd.meter.currentProduction - this.meterData.lommerd.meter.currentConsumption;
  }

  get currentDazoDelta() {
    return -this.meterData.dazo.meter.currentConsumption;
  }

  get currentNetwerkDelta() {
    return this.currentLommerdDelta + this.currentDazoDelta;
  }

  get totalLommerdDelta() {
    return this.meterData.lommerd.meter.production - this.meterData.lommerd.meter.consumption;
  }

  get totalDazoDelta() {
    return -this.meterData.dazo.meter.consumption;
  }

  get totalNetwerkDelta() {
    return this.totalLommerdDelta + this.totalDazoDelta;
  }



  
}
