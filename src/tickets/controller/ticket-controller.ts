import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { SERVICE_PREFIX } from '../../utils/utils';
import {
  ITicketService,
  TICKET_SERVICE
} from '../services/ticket.service.interface';
import { TicketRequest } from '../dto/ticket.request';

@ApiTags('Tickets')
@Controller(`${SERVICE_PREFIX}/itinerary`)
export class TicketController {
  constructor(
    @Inject(TICKET_SERVICE)
    private ticketService: ITicketService
  ) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    summary: 'Sort and retrieve a travel itinerary',
    description:
      'Sorts a list of travel tickets into a chronological itinerary.' +
      '\n\nThis endpoint is used to organize tickets and provide a clear travel plan for the user.'
  })
  @ApiBadRequestResponse({
    description: 'Bad request. The request body and/or parameters are malformed'
  })
  @ApiBody({
    type: TicketRequest,
    required: true,
    description:
      'Provide a list of travel tickets to sort and generate a travel itinerary.',
    examples: {
      example1: {
        summary: 'Sample Request',
        description:
          'Sorts the provided tickets into a chronological travel itinerary.',
        value: {
          tickets: [
            {
              type: 'train',
              origin: 'St. Anton am Arlberg Bahnhof',
              destination: 'Innsbruck Hbf',
              details: {
                trainNumber: 'RJX 765',
                platform: '3',
                seat: '17C'
              }
            },
            {
              type: 'tram',
              origin: 'Innsbruck Hbf',
              destination: 'Innsbruck Airport',
              details: {
                tramNumber: 'S5'
              }
            }
          ]
        }
      }
    }
  })
  public async getItinerary(@Body() body: TicketRequest): Promise<any> {
    return await this.ticketService.getItinerary(body);
  }
}
