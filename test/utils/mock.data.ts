export const EXPECTED_RESPONSE = [
  '0. Start.',
  '1. Board train RJX 765, Platform 3 from St. Anton am Arlberg Bahnhof to Innsbruck Hbf. Seat number 17C.',
  '2. Board the Tram S5 from Innsbruck Hbf to Innsbruck Airport.',
  '3. From Innsbruck Airport, board the flight AA904 to Venice Airport from gate 10, seat 18B. Self-check-in luggage at counter',
  '4. Board train ICN 35780, Platform 1 from Gara Venetia Santa Lucia to Bologna San Ruffillo. Seat number 13F.',
  '5. Board the bus from Bologna San Ruffillo to Bologna Guglielmo Marconi Airport. No seat assignment',
  '6. From Bologna Guglielmo Marconi Airport, board the flight AF1229 to Paris CDG Airport from gate 22, seat 10A. Self-check-in luggage at counter',
  "7. From Paris CDG Airport, board the flight AF136 to Chicago O'Hare from gate 32, seat 10A. Luggage will transfer automatically from the last flight",
  '8. Last destination reached.'
];

export const TICKETS_DATA = {
  tickets: [
    {
      type: 'flight',
      from: {
        city: 'Bologna',
        location: 'Bologna Guglielmo Marconi Airport'
      },
      to: {
        city: 'Paris',
        location: 'Paris CDG Airport'
      },
      details: {
        flightNumber: 'AF1229',
        gate: '22',
        seat: '10A',
        luggage: 'Self-check-in luggage at counter'
      }
    },
    {
      type: 'tram',
      from: {
        city: 'Innsbruck',
        location: 'Innsbruck Hbf'
      },
      to: {
        city: 'Innsbruck',
        location: 'Innsbruck Airport'
      },
      details: {
        tramNumber: 'S5'
      }
    },
    {
      type: 'bus',
      from: {
        city: 'Bologna',
        location: 'Bologna San Ruffillo'
      },
      to: {
        city: 'Bologna',
        location: 'Bologna Guglielmo Marconi Airport'
      },
      details: {
        seat: 'No seat assignment'
      }
    },
    {
      type: 'flight',
      from: {
        city: 'Innsbruck',
        location: 'Innsbruck Airport'
      },
      to: {
        city: 'Venice',
        location: 'Venice Airport'
      },
      details: {
        flightNumber: 'AA904',
        gate: '10',
        seat: '18B',
        luggage: 'Self-check-in luggage at counter'
      }
    },
    {
      type: 'flight',
      from: {
        city: 'Paris',
        location: 'Paris CDG Airport'
      },
      to: {
        city: 'Chicago',
        location: "Chicago O'Hare"
      },
      details: {
        flightNumber: 'AF136',
        gate: '32',
        seat: '10A',
        luggage: 'Luggage will transfer automatically from the last flight'
      }
    },
    {
      type: 'train',
      from: {
        city: 'Venice',
        location: 'Gara Venetia Santa Lucia'
      },
      to: {
        city: 'Bologna',
        location: 'Bologna San Ruffillo'
      },
      details: {
        trainNumber: 'ICN 35780',
        platform: '1',
        seat: '13F'
      }
    },
    {
      type: 'train',
      from: {
        city: 'St. Anton',
        location: 'St. Anton am Arlberg Bahnhof'
      },
      to: {
        city: 'Innsbruck',
        location: 'Innsbruck Hbf'
      },
      details: {
        trainNumber: 'RJX 765',
        platform: '3',
        seat: '17C'
      }
    }
  ]
};

export const JOURNEY_WITH_NO_ORIGIN = {
  tickets: [
    ...TICKETS_DATA.tickets.slice(0, -1),
    {
      type: 'train',
      from: {
        city: 'Innsbruck',
        location: 'Innsbruck Hbf'
      },
      to: {
        city: 'Innsbruck',
        location: 'Innsbruck Hbf'
      },
      details: {
        trainNumber: 'RJX 765',
        platform: '3',
        seat: '17C'
      }
    }
  ]
};
