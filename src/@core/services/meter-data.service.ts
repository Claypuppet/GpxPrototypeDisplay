import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Socket} from 'ngx-socket-io';

import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MData} from './socket-interfaces';
import {CollectedData, EalyzeMeasurement, MeterMeasurement, SolarEdgeMeasurement} from '../models';

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
    this.collectedData = new CollectedData();
    this.bindObservables();
    this.setEventListeners();
  }

  private bindObservables() {
    this.updatedMeterMeasurement = super.fromEvent<MData<MeterMeasurement>>('measurement:meter');
    this.updatedSolarEdgeMeasurement = super.fromEvent<MData<SolarEdgeMeasurement>>('measurement:solaredge');
    this.updatedEalyzeMeasurement = super.fromEvent<MData<EalyzeMeasurement>>('measurement:ealyze');
  }

  private setEventListeners() {
    this.updatedMeterMeasurement.subscribe(data => {
      console.log(data);
      if (data.lommerd) {
        this.collectedData.lommerd.meter = data.lommerd;
      }
      else if (data.dazo) {
        this.collectedData.dazo.meter = data.dazo;
      }
      this._meterData.next(this.collectedData);
    });
    this.updatedSolarEdgeMeasurement.subscribe(data => {
      if (data.lommerd) {
        this.collectedData.lommerd.solaredge = data.lommerd;
      }
      this._meterData.next(this.collectedData);
    });
    this.updatedEalyzeMeasurement.subscribe(data => {
      if (data.lommerd) {
        this.collectedData.lommerd.ealyze = data.lommerd;
      }
      else if (data.dazo) {
        this.collectedData.dazo.ealyze = data.dazo;
      }
      this._meterData.next(this.collectedData);
    });
  }
}
