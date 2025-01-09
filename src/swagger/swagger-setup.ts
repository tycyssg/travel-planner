import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces';
import * as fs from 'fs';
import {SERVICE_PREFIX} from "../utils/utils";

@Injectable()
export class SwaggerSetup {
  private readonly logger = new Logger(SwaggerSetup.name);

  public setSwagger(app: INestApplication): void {
    this.logger.log('Setup Swagger ...');
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const options = new DocumentBuilder()
      .setTitle('Travel Planner Service')
        .setDescription(
            'Travel Planner Service provides REST APIs to manage and organize travel itineraries efficiently. ' +
            '<br><br>' +
            'Using this service, users can input unsorted travel tickets, automatically arrange them in the correct order, ' +
            'and retrieve a complete, human-readable itinerary.'
        )
      .setVersion(packageJson.version)
      .build();

    const document: OpenAPIObject = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(`${SERVICE_PREFIX}/api-docs`, app, document);
    this.logger.log('Setup Swagger done');
  }
}
