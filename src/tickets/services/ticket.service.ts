import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { ITicketService } from './ticket-service.interface';
import { TicketRequest } from '../dto/ticket.request';
import { TicketDetails } from '../dto/ticket-details';
import {
  isBusDetails,
  isFlightDetails,
  isTrainDetails,
  isTramDetails
} from '../types/transit-details.type';
import { compareTicketTypes } from '../../utils/utils';

@Injectable()
export class TicketService implements ITicketService {
  private logger: Logger = new Logger(TicketService.name);

  public async getItinerary(body: TicketRequest): Promise<string[]> {
    const { tickets } = body;
    this.logger.log(`Preparing the itinerary of ${tickets.length} tickets`);
    // Step 1: Sort the tickets
    const sortedTickets: TicketDetails[] = await this.sortTickets(tickets);

    this.logger.log(`Preparing the final display of the sorted tickets.`);
    // Step 2: Generate the readable itinerary
    return this.generateItineraryDisplay(sortedTickets);
  }

  private async sortTickets(
    tickets: TicketDetails[]
  ): Promise<TicketDetails[]> {
    this.logger.log('Starting the sorting process of the tickets.');

    // Normalize tickets and group by city
    const { cityMap, destinationSet } = this.groupTicketsByCity(tickets);
    this.logger.log('Normalizing tickets process has been completed.');

    // Find the starting point
    const startCity: string | undefined = this.findStartCity(
      cityMap,
      destinationSet
    );

    if (!startCity) {
      const errorMessage =
        'Invalid ticket data: No valid starting point found.';
      this.logger.error(errorMessage);
      throw new BadRequestException(errorMessage);
    }
    this.logger.log(
      `The ${startCity} has been established as the origin destination.`
    );

    // Sort tickets within the same city
    this.sortTicketsByPriority(cityMap);
    this.logger.log('Sort the tickets based on the transport priority.');

    // Build and return the sorted list
    const sortedTickets: TicketDetails[] = this.buildSortedTicketsList(
      cityMap,
      startCity
    );
    this.logger.log('Sorting process has been completed.');

    return sortedTickets;
  }

  private groupTicketsByCity(tickets: TicketDetails[]): {
    cityMap: Map<string, TicketDetails[]>;
    destinationSet: Set<string>;
  } {
    const cityMap = new Map<string, TicketDetails[]>();
    const destinationSet = new Set<string>();

    tickets.forEach((ticket: TicketDetails) => {
      const fromCity = ticket.from.city;
      const toCity = ticket.to.city;

      if (!cityMap.has(fromCity)) {
        cityMap.set(fromCity, []);
      }
      cityMap.get(fromCity).push(ticket);
      destinationSet.add(toCity);
    });

    return { cityMap, destinationSet };
  }

  private findStartCity(
    cityMap: Map<string, TicketDetails[]>,
    destinationSet: Set<string>
  ): string | undefined {
    return Array.from(cityMap.keys()).find((city) => !destinationSet.has(city));
  }

  private sortTicketsByPriority(cityMap: Map<string, TicketDetails[]>): void {
    cityMap.forEach((tickets: TicketDetails[]) => {
      tickets.sort((a, b) => compareTicketTypes(a.type, b.type));
    });
  }

  private buildSortedTicketsList(
    cityMap: Map<string, TicketDetails[]>,
    startCity: string
  ): TicketDetails[] {
    const sortedTickets: TicketDetails[] = [];
    //initialize the flow with the start city
    let currentCity: string = startCity;

    while (currentCity) {
      const ticketsFromCity: TicketDetails[] = cityMap.get(currentCity); //get the city payload from the map

      if (!ticketsFromCity || ticketsFromCity.length === 0) {
        //stop the loop when all the cities have been processed
        break;
      }

      const currentTicket: TicketDetails = ticketsFromCity.shift(); // Remove the ticket once processed
      sortedTickets.push(currentTicket);

      currentCity = currentTicket.to.city; // Move to the next city
    }

    return sortedTickets;
  }

  private generateItineraryDisplay(tickets: TicketDetails[]): string[] {
    const itinerary: string[] = [];
    itinerary.push('0. Start.');

    tickets.forEach((ticket, index) => {
      const step = this.formatTicketDisplayText(ticket, index + 1);
      itinerary.push(step);
    });

    itinerary.push(`${tickets.length + 1}. Last destination reached.`);
    return itinerary;
  }

  private formatTicketDisplayText(
    ticket: TicketDetails,
    stepNumber: number
  ): string {
    const { from, to, details } = ticket;

    if (isTrainDetails(details)) {
      return `${stepNumber}. Board train ${details.trainNumber}, Platform ${details.platform} from ${from.location} to ${to.location}. ${details.seat ? `Seat number ${details.seat}.` : ''}`;
    }

    if (isTramDetails(details)) {
      return `${stepNumber}. Board the Tram ${details.tramNumber} from ${from.location} to ${to.location}.`;
    }

    if (isFlightDetails(details)) {
      return `${stepNumber}. From ${from.location}, board the flight ${details.flightNumber} to ${to.location} from gate ${details.gate}, seat ${details.seat}. ${details.luggage || ''}`;
    }

    if (isBusDetails(details)) {
      return `${stepNumber}. Board the bus from ${from.location} to ${to.location}. ${details.seat || 'No seat assignment.'}`;
    }
  }
}
