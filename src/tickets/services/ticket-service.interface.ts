import { TicketRequest } from '../dto/ticket.request';

export const TICKET_SERVICE = 'ITicketService';

export interface ITicketService {
  getItinerary(body: TicketRequest): Promise<string[]>;
}
