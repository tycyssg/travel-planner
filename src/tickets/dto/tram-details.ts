import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import {
  isNotEmptyErrorMessage,
  isStringErrorMessage
} from '../../shared/error-messages-constants';

export class TramDetails {
  @ApiProperty({ description: 'Tram number for the journey', example: 'S5' })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('tramNumber', TramDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('tramNumber', TramDetails.name)
  })
  tramNumber: string;
}
