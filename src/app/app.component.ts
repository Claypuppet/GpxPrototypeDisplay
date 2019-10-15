import {Component, OnDestroy, OnInit} from '@angular/core';

import {CollectedData, MeterDataService} from '@core/services/meter-data.service';
import {Subject} from 'rxjs/Subject';
import {takeUntil} from 'rxjs/operators';

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
      this.meterData = value;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

}
