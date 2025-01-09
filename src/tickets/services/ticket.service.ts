import { Injectable, Logger } from '@nestjs/common';
import { ITicketService } from './ticket.service.interface';
import { TicketRequest } from '../dto/ticket.request';

@Injectable()
export class TicketService implements ITicketService {
  private logger: Logger = new Logger(TicketService.name);

  public async getItinerary(body: TicketRequest): Promise<any> {
    this.logger.debug(`GetItinerary: ${JSON.stringify(body)}`);
    return body;
  }
}
