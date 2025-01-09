import { TrainDetails } from '../dto/train-details';
import { TramDetails } from '../dto/tram-details';
import { FlightDetails } from '../dto/flight-details';
import { BusDetails } from '../dto/bus-details';

export type TransitDetails =
  | TrainDetails
  | TramDetails
  | FlightDetails
  | BusDetails;
