import { Module } from '@nestjs/common';
import { TICKET_SERVICE } from './services/ticket-service.interface';
import { TicketService } from './services/ticket.service';
import { TicketController } from './controller/ticket-controller';

@Module({
  controllers: [TicketController],
  providers: [{ provide: TICKET_SERVICE, useClass: TicketService }],
  exports: [TICKET_SERVICE]
})
export class TicketModule {}
