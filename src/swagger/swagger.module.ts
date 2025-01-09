import { Module } from '@nestjs/common';
import { SwaggerSetup } from './swagger-setup';

@Module({
  providers: [SwaggerSetup]
})
export class SwaggerModule {}
