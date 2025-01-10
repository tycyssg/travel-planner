## Description

The Travel Planner Service is a RESTful API designed to help users efficiently plan and organize travel itineraries from a set of tickets provided as input. 
The service processes various types of transportation tickets, sorts them into the correct sequence, and returns a human-readable itinerary for the user.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Run tests

```bash
# integration tests
$ npm run test:integration

# integration test coverage
$ npm run test:cov
```
In this project, I opted to focus exclusively on integration tests instead of writing unit tests because integration tests effectively cover all the scenarios that unit tests would address, and adding unit tests would be redundant.

Key Reasons for Choosing Integration Tests<br>

1. Comprehensive Coverage:<br>
Integration tests ensure that all components work together as expected. They validate the system end-to-end, including the interaction between services, controllers, and data models.<br>
Since integration tests cover the entire flow of the application, they inherently include the functionality that unit tests would individually test.

2. Avoiding Redundancy:<br>
Unit tests focus on testing individual methods or classes in isolation. However, integration tests already validate these methods as part of the larger system.<br>
Writing unit tests alongside integration tests would duplicate effort without adding significant value.

3. Realistic Testing Environment:<br>
   Integration tests simulate real-world usage scenarios by interacting with the application as a whole. This ensures that all layers (e.g., controllers, services, and database) work seamlessly together.<br>
   This approach reduces the risk of missing edge cases or issues that might arise only when components interact.

## Request Sample Data

<details>
  <summary>Click to expand the sample request payload</summary>

```json
{
   "tickets": [
      {
         "type": "flight",
         "from": {
            "city": "Berlin",
            "location": "Berlin Brandenburg Airport"
         },
         "to": {
            "city": "Amsterdam",
            "location": "Amsterdam Schiphol Airport"
         },
         "details": {
            "flightNumber": "KL1772",
            "gate": "B12",
            "seat": "14C",
            "luggage": "Self-check-in luggage at counter"
         }
      },
      {
         "type": "tram",
         "from": {
            "city": "Amsterdam",
            "location": "Amsterdam Central Station"
         },
         "to": {
            "city": "Amsterdam",
            "location": "Amsterdam Sloterdijk Station"
         },
         "details": {
            "tramNumber": "26"
         }
      },
      {
         "type": "bus",
         "from": {
            "city": "Amsterdam",
            "location": "Amsterdam Sloterdijk Bus Terminal"
         },
         "to": {
            "city": "Rotterdam",
            "location": "Rotterdam Central Station"
         },
         "details": {
            "seat": "No seat assignment"
         }
      },
      {
         "type": "flight",
         "from": {
            "city": "Rotterdam",
            "location": "Rotterdam The Hague Airport"
         },
         "to": {
            "city": "London",
            "location": "London Heathrow Airport"
         },
         "details": {
            "flightNumber": "BA435",
            "gate": "C5",
            "seat": "21A",
            "luggage": "Self-check-in luggage at counter"
         }
      },
      {
         "type": "flight",
         "from": {
            "city": "London",
            "location": "London Heathrow Airport"
         },
         "to": {
            "city": "New York",
            "location": "John F. Kennedy International Airport"
         },
         "details": {
            "flightNumber": "AA100",
            "gate": "D14",
            "seat": "8F",
            "luggage": "Luggage will transfer automatically from the last flight"
         }
      },
      {
         "type": "train",
         "from": {
            "city": "New York",
            "location": "Penn Station"
         },
         "to": {
            "city": "Boston",
            "location": "South Station"
         },
         "details": {
            "trainNumber": "Acela 2150",
            "platform": "5",
            "seat": "10D"
         }
      },
      {
         "type": "train",
         "from": {
            "city": "Boston",
            "location": "South Station"
         },
         "to": {
            "city": "Portland",
            "location": "Portland Transportation Center"
         },
         "details": {
            "trainNumber": "Downeaster 684",
            "platform": "2",
            "seat": "15A"
         }
      }
   ]
}
```
</details> 

## Example cURL Command

<details>
  <summary>To test the API, you can use the following cURL command:</summary>

```bash
curl --location 'http://localhost:3000/travel-planner/itinerary' \
--header 'Content-Type: application/json' \
--data '{
  "tickets": [
    {
      "type": "flight",
      "from": {
        "city": "Bologna",
        "location": "Bologna Guglielmo Marconi Airport"
      },
      "to": {
        "city": "Paris",
        "location": "Paris CDG Airport"
      },
      "details": {
        "flightNumber": "AF1229",
        "gate": "22",
        "seat": "10A",
        "luggage": "Self-check-in luggage at counter"
      }
    },
    {
      "type": "tram",
      "from": {
        "city": "Innsbruck",
        "location": "Innsbruck Hbf"
      },
      "to": {
        "city": "Innsbruck",
        "location": "Innsbruck Airport"
      },
      "details": {
        "tramNumber": "S5"
      }
    },
    {
      "type": "bus",
      "from": {
        "city": "Bologna",
        "location": "Bologna San Ruffillo"
      },
      "to": {
        "city": "Bologna",
        "location": "Bologna Guglielmo Marconi Airport"
      },
      "details": {
        "seat": "No seat assignment"
      }
    },
    {
      "type": "flight",
      "from": {
        "city": "Innsbruck",
        "location": "Innsbruck Airport"
      },
      "to": {
        "city": "Venice",
        "location": "Venice Airport"
      },
      "details": {
        "flightNumber": "AA904",
        "gate": "10",
        "seat": "18B",
        "luggage": "Self-check-in luggage at counter"
      }
    },
    {
      "type": "flight",
      "from": {
        "city": "Paris",
        "location": "Paris CDG Airport"
      },
      "to": {
        "city": "Chicago",
        "location": "Chicago O'Hare"
      },
      "details": {
        "flightNumber": "AF136",
        "gate": "32",
        "seat": "10A",
        "luggage": "Luggage will transfer automatically from the last flight"
      }
    },
    {
      "type": "train",
      "from": {
        "city": "Venice",
        "location": "Gara Venetia Santa Lucia"
      },
      "to": {
        "city": "Bologna",
        "location": "Bologna San Ruffillo"
      },
      "details": {
        "trainNumber": "ICN 35780",
        "platform": "1",
        "seat": "13F"
      }
    },
    {
      "type": "train",
      "from": {
        "city": "St. Anton",
        "location": "St. Anton am Arlberg Bahnhof"
      },
      "to": {
        "city": "Innsbruck",
        "location": "Innsbruck Hbf"
      },
      "details": {
        "trainNumber": "RJX 765",
        "platform": "3",
        "seat": "17C"
      }
    }
  ]
}'
```
</details>

## Adding New Types of Transit to the Travel Planner Service
To extend the Travel Planner Service with new transit types, the system is designed to be modular and adaptable. 
Here’s a step-by-step guide to adding a new transit type with different characteristics using the existing DTOs and models.

### Steps to Add a New Transit Type
1. Update the TicketType Enum Add the new transit type to the TicketType enum to define its identity in the system
```code
export enum TicketType {
  TRAIN = 'train',
  TRAM = 'tram',
  BUS = 'bus',
  FLIGHT = 'flight',
  BOAT = 'boat' // New transit type
}
```
2. Create a New Details Class Define a new class for the specific transit type. Include relevant properties and validation rules.
```code
export class BoatDetails {
  boatName: string;
  deck?: string;
  cabin?: string;
}
```
3. Update the TransitDetails Union Type Add the new BoatDetails class to the TransitDetails type union.
```code
export type TransitDetails =
  | TrainDetails
  | TramDetails
  | FlightDetails
  | BusDetails
  | BoatDetails; // New transit type details
  ```
4. Update the details Discriminator Modify the @Type() decorator in the details field of the TicketDetails DTO to recognize the new transit type.
```code
@Type((options) => {
  const object = options?.object as { type: TicketType }; // Access the parent object
  switch (object?.type) {
    case TicketType.TRAIN:
      return TrainDetails;
    case TicketType.TRAM:
      return TramDetails;
    case TicketType.FLIGHT:
      return FlightDetails;
    case TicketType.BUS:
      return BusDetails;
    case TicketType.BOAT: // Handle new transit type
      return BoatDetails;
  }
})
details: TransitDetails;
  ```
5. Add a Type Guard Define a type guard to identify objects of the new transit type.
```code
export function isBoatDetails(details: TransitDetails): details is BoatDetails {
  return 'boatName' in details;
}
  ```
6. Update Sorting Logic (if applicable) Is the new transit type requires prioritization in sorting, add it to the priority map.
```code
export const TICKET_TYPE_PRIORITY: Record<string, number> = {
  [TicketType.BUS]: 1,
  [TicketType.TRAM]: 2,
  [TicketType.TRAIN]: 3,
  [TicketType.FLIGHT]: 4
}
  ```

## Example New Ticket with Boat Type
```json
{
  "type": "boat",
  "from": {
    "city": "Venice",
    "location": "Venice Port"
  },
  "to": {
    "city": "Dubrovnik",
    "location": "Dubrovnik Port"
  },
  "details": {
    "boatName": "Blue Star Ferry",
    "deck": "Upper Deck",
    "cabin": "A12"
  }
}
```
## Author
 [Ciprian Tudose](https://www.linkedin.com/in/ciprian-tudose/)

