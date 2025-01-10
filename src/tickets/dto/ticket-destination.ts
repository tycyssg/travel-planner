import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  isNotEmptyErrorMessage,
  isStringErrorMessage
} from '../../shared/error-messages-constants';

export class TicketDestination {
  @ApiProperty({
    description: 'City Destination',
    example: 'Paris'
  })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('city', TicketDestination.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('city', TicketDestination.name)
  })
  city: string;

  @ApiProperty({
    description: 'Destination location',
    example: 'Innsbruck Hbf'
  })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('location', TicketDestination.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('location', TicketDestination.name)
  })
  location: string;
}
