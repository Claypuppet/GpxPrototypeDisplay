import {MeterMeasurement} from './MeterMeasurement';
import {EalyzeMeasurement} from './EalyzeMeasurement';
import {SolarEdgeMeasurement} from './SolarEdgeMeasurement';

export class CollectedData {
  lommerd: {
    meter?: MeterMeasurement;
    ealyze?: EalyzeMeasurement;
    solaredge?: SolarEdgeMeasurement;
  } = {};
  dazo: {
    meter?: MeterMeasurement;
    ealyze?: EalyzeMeasurement;
  } = {};
}
