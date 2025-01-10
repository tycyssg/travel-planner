import { Module } from '@nestjs/common';
import { SwaggerModule } from './swagger/swagger.module';
import { TicketModule } from './tickets/ticket.module';
import { FiltersModule } from './filters/filters.module';

@Module({
  imports: [SwaggerModule, TicketModule, FiltersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
