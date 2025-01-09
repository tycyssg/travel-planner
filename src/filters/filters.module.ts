import { Module } from '@nestjs/common';
import { AllExceptionsFilter } from './exceptions.filter';

@Module({
  imports: [],
  providers: [AllExceptionsFilter],
  exports: [AllExceptionsFilter]
})
export class FiltersModule {}
