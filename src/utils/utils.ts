import { TicketType } from '../tickets/enums/ticket-type.enum';

export const SERVICE_NAME = 'travel-planner';
export const SERVICE_PREFIX = `/${SERVICE_NAME}`;

export const TICKET_TYPE_PRIORITY: Record<string, number> = {
  [TicketType.BUS]: 1,
  [TicketType.TRAM]: 2,
  [TicketType.TRAIN]: 3,
  [TicketType.FLIGHT]: 4
};

export function compareTicketTypes(typeA: string, typeB: string): number {
  return (
    (TICKET_TYPE_PRIORITY[typeA] || Infinity) -
    (TICKET_TYPE_PRIORITY[typeB] || Infinity)
  );
}
