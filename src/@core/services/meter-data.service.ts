import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Socket} from 'ngx-socket-io';

import {environment} from '../../environments/environment';
import {EalyzeMeasurement, MData, MeterMeasurement, SolarEdgeMeasurement} from './socket-interfaces';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export interface CollectedData {
  lommerd: {
    meter: MeterMeasurement;
    ealyze: EalyzeMeasurement;
    solaredge: SolarEdgeMeasurement;
  };
  dazo: {
    meter: MeterMeasurement;
    ealyze: EalyzeMeasurement;
  };
}

@Injectable({
  providedIn: 'root'
})
export class MeterDataService extends Socket {
  private updatedMeterMeasurement: Observable<MData<MeterMeasurement>>;
  private updatedSolarEdgeMeasurement: Observable<MData<SolarEdgeMeasurement>>;
  private updatedEalyzeMeasurement: Observable<MData<EalyzeMeasurement>>;

  private collectedData: CollectedData;
  private _meterData: BehaviorSubject<CollectedData> = new BehaviorSubject<CollectedData>(null);

  get meterData(): Observable<CollectedData> {
    return this._meterData.asObservable();
  }

  constructor() {
    super({url: environment.socketUrl, options: {reconnection: true, autoConnect: true, pingTimeout: 2000}});
    this.bindObservables();
    this.setEventListeners();
  }

  private bindObservables() {
    this.updatedMeterMeasurement = super.fromEvent<MData<MeterMeasurement>>('room:update');
    this.updatedSolarEdgeMeasurement = super.fromEvent<MData<SolarEdgeMeasurement>>('room:new');
    this.updatedEalyzeMeasurement = super.fromEvent<MData<EalyzeMeasurement>>('room:delete');
  }

  private setEventListeners() {
    this.updatedMeterMeasurement.subscribe(data => {
      if (data[1]) {
        this.collectedData.lommerd.meter = data[1];
      }
      this._meterData.next(this.collectedData);
    });
    this.updatedSolarEdgeMeasurement.subscribe(data => {
      // TODO: Set data
      this._meterData.next(this.collectedData);
    });
    this.updatedEalyzeMeasurement.subscribe(data => {
      // TODO: Set data
      this._meterData.next(this.collectedData);
    });
  }
}
