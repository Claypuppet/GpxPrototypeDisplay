export interface MeterMeasurement {
  moment: Date;
  serial: string;
  consumption1: number;
  consumption2: number;
  production1: number;
  production2: number;
  currentConsumption: number;
  currentProduction: number;
}
