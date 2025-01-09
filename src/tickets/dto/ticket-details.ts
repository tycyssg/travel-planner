import { TicketType } from '../enums/ticket-type.enum';
import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { TransitDetails } from '../types/transit-details.type';
import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested
} from 'class-validator';
import {
  isDefinedErrorMessage,
  isEnumErrorMessage,
  isNotEmptyErrorMessage,
  isStringErrorMessage
} from '../../shared/error-messages-constants';
import { TrainDetails } from './train-details';
import { TramDetails } from './tram-details';
import { FlightDetails } from './flight-details';
import { BusDetails } from './bus-details';
import { Type } from 'class-transformer';

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
    description: 'Starting location',
    example: 'St. Anton am Arlberg Bahnhof'
  })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('origin', TicketDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('origin', TicketDetails.name)
  })
  origin: string;

  @ApiProperty({
    description: 'Destination location',
    example: 'Innsbruck Hbf'
  })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('destination', TicketDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('destination', TicketDetails.name)
  })
  destination: string;

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
      case TicketType.AIR_PLANE:
        return FlightDetails;
      case TicketType.BUS:
        return BusDetails;
    }
  })
  details: TransitDetails;
}
