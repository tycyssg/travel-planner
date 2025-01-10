import { TicketType } from '../enums/ticket-type.enum';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { TransitDetails } from '../types/transit-details.type';
import { IsDefined, IsEnum, ValidateNested } from 'class-validator';
import {
  isDefinedErrorMessage,
  isEnumErrorMessage
} from '../../shared/error-messages-constants';
import { TrainDetails } from './train-details';
import { TramDetails } from './tram-details';
import { FlightDetails } from './flight-details';
import { BusDetails } from './bus-details';
import { Type } from 'class-transformer';
import { TicketDestination } from './ticket-destination';

@ApiExtraModels(TrainDetails, TramDetails, FlightDetails, BusDetails)
export class TicketDetails {
  @ApiProperty({
    description: 'Type of transit',
    enum: TicketType,
    example: TicketType.TRAIN
  })
  @IsEnum(TicketType, {
    message: isEnumErrorMessage('type', TicketDetails.name)
  })
  type: TicketType;

  @ApiProperty({
    description:
      'From Destination - Represents the place where the passenger departs'
  })
  @IsDefined({ message: isDefinedErrorMessage('from', TicketDetails.name) })
  @Type(() => TicketDestination)
  from: TicketDestination;

  @ApiProperty({
    description: 'To Destination - Represent the place where passenger arrives'
  })
  @IsDefined({ message: isDefinedErrorMessage('to', TicketDetails.name) })
  @Type(() => TicketDestination)
  to: TicketDestination;

  @ApiProperty({
    description: 'Details of the transit',
    oneOf: [
      { $ref: getSchemaPath(TrainDetails) },
      { $ref: getSchemaPath(TramDetails) },
      { $ref: getSchemaPath(FlightDetails) },
      { $ref: getSchemaPath(BusDetails) }
    ]
  })
  @IsDefined({ message: isDefinedErrorMessage('details', TicketDetails.name) })
  @ValidateNested({ each: true })
  @Type((options) => {
    const object = options?.object as { type: TicketType }; // Access the parent object
    switch (object?.type) {
      case TicketType.TRAIN:
        return TrainDetails;
      case TicketType.TRAM:
        return TramDetails;
      case TicketType.FLIGHT:
        return FlightDetails;
      case TicketType.BUS:
        return BusDetails;
    }
  })
  details: TransitDetails;
}
