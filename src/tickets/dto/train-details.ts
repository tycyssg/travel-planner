import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  isNotEmptyErrorMessage,
  isStringErrorMessage
} from '../../shared/error-messages-constants';

export class TrainDetails {
  @ApiProperty({
    description: 'Train number for the journey',
    example: 'RJX 765'
  })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('trainNumber', TrainDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('trainNumber', TrainDetails.name)
  })
  trainNumber: string;

  @ApiProperty({ description: 'Platform number for boarding', example: '3' })
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('platform', TrainDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('platform', TrainDetails.name)
  })
  platform: string;

  @ApiProperty({
    description: 'Seat number (optional)',
    example: '17C',
    required: false
  })
  @IsOptional()
  @IsNotEmpty({
    always: true,
    message: isNotEmptyErrorMessage('seat', TrainDetails.name)
  })
  @IsString({
    always: true,
    message: isStringErrorMessage('seat', TrainDetails.name)
  })
  seat?: string;
}
