export interface MeterMeasurement {
  moment: Date;
  serial: string;
  consumption: number;
  production: number;
  currentConsumption: number;
  currentProduction: number;
}
