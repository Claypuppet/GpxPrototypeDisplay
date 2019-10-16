import { Component, OnDestroy, OnInit } from '@angular/core';

import { MeterDataService } from '@core/services/meter-data.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';
import { CollectedData } from '../@core/models';
import { Observable } from 'rxjs/Observable';
import { MatSlideToggleChange } from '@angular/material';
// import 'rxjs/add/observable/interval';
// import 'rxjs/add/operator/take';
// import { interval } from 'rxjs';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject();
  meterData: CollectedData;

  // UI
  // progressValue = -10;
  // progressValueNegative = 110;
  panelOnOff: boolean;


  lommerdDelta: number;
  dazoDelta: number;
  netwerkDelta: number;

  constructor(private meterDataService: MeterDataService) {

    // interval(15).subscribe(x => {
    //   if (this.progressValue >= 100) {
    //     this.progressValue = -10;

    //     // this.progressValue = 0;
    //   }
    //   this.progressValue = this.progressValue + 1;

    // });
    // interval(15).subscribe(x => {
    //   if (this.progressValueNegative <= 0) {
    //     this.progressValueNegative = 110;

    //     // this.progressValue = 0;
    //   }
    //   this.progressValueNegative = this.progressValueNegative + -1;

    // });
  }

  ngOnInit(): void {
    this.sampleData();
    this.meterDataService.meterData.pipe(takeUntil(this._unsubscribeAll)).subscribe(value => {
      if (value) {
        // this.meterData = value;
        this.setValues();
      }
    });
  }

  setValues() {
    this.lommerdDelta = this.meterData.lommerd.meter.currentProduction - this.meterData.lommerd.meter.currentConsumption;
    this.dazoDelta = this.meterData.dazo.meter.currentProduction - this.meterData.dazo.meter.currentConsumption;
    this.netwerkDelta = this.lommerdDelta - Math.abs(this.dazoDelta);

    // this.meterData.lommerd.meter.currentConsumption = this.meterData.lommerd.meter.consumption1 + this.meterData.lommerd.meter.consumption2;
    // this.meterData.dazo.meter.currentConsumption = this.meterData.dazo.meter.consumption1 + this.meterData.dazo.meter.consumption2;
    // this.meterData.lommerd.meter.currentProduction = this.meterData.lommerd.meter.production1 + this.meterData.lommerd.meter.production2;
    // this.meterData.dazo.meter.currentProduction = this.meterData.dazo.meter.production1 + this.meterData.dazo.meter.production2;
  }


  sampleData() {
    this.meterData = new CollectedData();
    this.meterData.lommerd = {
      meter: {
        moment: new Date(),
        serial: 'test',
        consumption1: 100,
        consumption2: 200,
        production1: 200,
        production2: 250,
        currentConsumption: 3,
        currentProduction: 20,
      },
      ealyze: {
        measurements: [{
          moment: new Date(),
          value: 100
        }]

      },
      solaredge: {
        currentPower: 200
      }
    };
    this.meterData.dazo = {
      meter: {
        moment: new Date(),
        serial: 'test',
        consumption1: 100,
        consumption2: 200,
        production1: 200,
        production2: 250,
        currentConsumption: 10,
        currentProduction: 0,
      },
      ealyze: {
        measurements: [{
          moment: new Date(),
          value: 100
        }]

      },
    };
    this.setValues();
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  togglePanel(event: MatSlideToggleChange) {
    // ALS DIT NODIG IS DAN MOET ER EEN BLOCKER OP DE INPUT DATA KOMEN VAN SERVER
    if (event.checked) {
      this.meterData.lommerd.meter.currentProduction = 20;
    } else {
      this.meterData.lommerd.meter.currentProduction = 0;
    }
    this.setValues();

  }

  toggleDazo(event: MatSlideToggleChange) {
    // ALS DIT NODIG IS DAN MOET ER EEN BLOCKER OP DE INPUT DATA KOMEN VAN SERVER
    if (event.checked) {
      this.meterData.dazo.meter.currentConsumption = 10;
    } else {
      this.meterData.dazo.meter.currentConsumption = 0;
    }
    this.setValues();

  }


  
}
