import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { SERVICE_PREFIX } from '../src/utils/utils';
import {
  EXPECTED_RESPONSE,
  JOURNEY_WITH_NO_ORIGIN,
  TICKETS_DATA
} from './utils/mock.data';

describe('Ticket Controller', () => {
  let app: INestApplication;
  const URL_PREFIX: string = `${SERVICE_PREFIX}/itinerary`;
  let requestBody = TICKETS_DATA;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  beforeEach(async () => {
    requestBody = JSON.parse(JSON.stringify(TICKETS_DATA));
  });

  it('/itinerary (POST) - Should return 200 for the proper payload', async () => {
    const response = await request(app.getHttpServer())
      .post(URL_PREFIX)
      .send(requestBody)
      .expect(200);

    expect(response.body.length).toEqual(9);
    response.body.forEach((line: string, index: number) => {
      expect(line).toEqual(EXPECTED_RESPONSE[index]);
    });
  });

  it('/itinerary (POST) - Should return 400 for when the payload does not have a destination', async () => {
    const response = await request(app.getHttpServer())
      .post(URL_PREFIX)
      .send(JOURNEY_WITH_NO_ORIGIN)
      .expect(400);

    expect(response.body.message).toEqual(
      'Invalid ticket data: No valid starting point found.'
    );
  });

  it('/itinerary (POST) - Should return 400 for when tickets array is empty', async () => {
    requestBody.tickets = [];
    const response = await request(app.getHttpServer())
      .post(URL_PREFIX)
      .send(requestBody)
      .expect(400);

    expect(response.body.message).toEqual([
      'The array: tickets in the object: TicketRequest is empty.'
    ]);
  });

  it('/itinerary (POST) - Should return 400 for when tickets array does not exists', async () => {
    delete requestBody.tickets;
    const response = await request(app.getHttpServer())
      .post(URL_PREFIX)
      .send(requestBody)
      .expect(400);

    expect(response.body.message).toEqual([
      'The property: tickets in the object: TicketRequest is not an array.',
      'The array: tickets in the object: TicketRequest is empty.'
    ]);
  });

  it('/itinerary (POST) - Should return 400 for when one or more tickets have a wrong type', async () => {
    requestBody.tickets[0].type = 'Ticket';
    requestBody.tickets[1].type = 'Ticket Ticket';
    const response = await request(app.getHttpServer())
      .post(URL_PREFIX)
      .send(requestBody)
      .expect(400);

    expect(response.body.message).toEqual([
      'tickets.0.The property: type in the object: TicketDetails must be a valid enum value.',
      'tickets.1.The property: type in the object: TicketDetails must be a valid enum value.'
    ]);
  });

  it('/itinerary (POST) - Should return 400 for when a ticket has no origin', async () => {
    requestBody.tickets[0].from = undefined;
    const response = await request(app.getHttpServer())
      .post(URL_PREFIX)
      .send(requestBody)
      .expect(400);

    expect(response.body.message).toEqual([
      'tickets.0.The property: from in the object: TicketDetails is not defined.'
    ]);
  });

  it('/itinerary (POST) - Should return 400 for when a ticket has no destination', async () => {
    requestBody.tickets[0].to = undefined;
    const response = await request(app.getHttpServer())
      .post(URL_PREFIX)
      .send(requestBody)
      .expect(400);

    expect(response.body.message).toEqual([
      'tickets.0.The property: to in the object: TicketDetails is not defined.'
    ]);
  });

  it('/itinerary (POST) - Should return 400 for when a ticket has no transit details', async () => {
    requestBody.tickets[0].details = undefined;
    const response = await request(app.getHttpServer())
      .post(URL_PREFIX)
      .send(requestBody)
      .expect(400);

    expect(response.body.message).toEqual([
      'tickets.0.The property: details in the object: TicketDetails is not defined.'
    ]);
  });
});
