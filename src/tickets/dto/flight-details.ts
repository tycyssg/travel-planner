import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  isNotEmptyErrorMessage,
  isStringErrorMessage
} from '../../shared/error-messages-constants';

export class FlightDetails {
  @ApiProperty({
    description: 'Flight number for the journey',
    example: 'AA904'
  })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('flightNumber', FlightDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('flightNumber', FlightDetails.name)
  })
  flightNumber: string;

  @ApiProperty({ description: 'Gate number for boarding', example: '10' })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('gate', FlightDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('gate', FlightDetails.name)
  })
  gate: string;

  @ApiProperty({ description: 'Seat number for the flight', example: '18B' })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('seat', FlightDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('seat', FlightDetails.name)
  })
  seat: string;

  @ApiProperty({
    description: 'Luggage Details',
    example: 'Self-check-in luggage at counter'
  })
  @IsOptional()
  @IsString({
    always: true,
    message: isStringErrorMessage('seat', FlightDetails.name)
  })
  luggage?: string;
}
