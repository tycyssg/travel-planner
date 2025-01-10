import { TrainDetails } from '../dto/train-details';
import { TramDetails } from '../dto/tram-details';
import { FlightDetails } from '../dto/flight-details';
import { BusDetails } from '../dto/bus-details';

export type TransitDetails =
  | TrainDetails
  | TramDetails
  | FlightDetails
  | BusDetails;

export function isTrainDetails(
  details: TransitDetails
): details is TrainDetails {
  return 'trainNumber' in details && 'platform' in details;
}

export function isTramDetails(details: TransitDetails): details is TramDetails {
  return 'tramNumber' in details;
}

export function isFlightDetails(
  details: TransitDetails
): details is FlightDetails {
  return 'flightNumber' in details;
}

export function isBusDetails(details: TransitDetails): details is BusDetails {
  return 'seat' in details || Object.keys(details).length === 0;
}
