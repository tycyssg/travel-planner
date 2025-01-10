import { ApiProperty } from '@nestjs/swagger';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import {
  arrayNotEmptyErrorMessage,
  isArrayErrorMessage
} from '../../shared/error-messages-constants';
import { Type } from 'class-transformer';
import { TicketDetails } from './ticket-details';

export class TicketRequest {
  @ApiProperty({
    description: 'Array of tickets to be sorted into a travel itinerary.',
    type: [TicketDetails]
  })
  @ArrayNotEmpty({
    always: true,
    message: arrayNotEmptyErrorMessage('tickets', TicketRequest.name)
  })
  @IsArray({ message: isArrayErrorMessage('tickets', TicketRequest.name) })
  @ValidateNested({ each: true })
  @Type(() => TicketDetails)
  tickets: TicketDetails[];
}
