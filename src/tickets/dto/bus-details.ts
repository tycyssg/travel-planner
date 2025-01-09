import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  isNotEmptyErrorMessage,
  isStringErrorMessage
} from '../../shared/error-messages-constants';

export class BusDetails {
  @ApiProperty({
    description: 'Seat assignment (optional)',
    example: 'No seat assignment',
    required: false
  })
  @IsOptional()
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('seat', BusDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('seat', BusDetails.name)
  })
  seat?: string;
}
