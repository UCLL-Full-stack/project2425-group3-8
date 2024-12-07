import { Event as EventPrisma, Sport as SportPrisma, Location as LocationPrisma, Matches as MatchesPrisma, Visitor as VisitorPrisma } from '@prisma/client';
import { Sport } from './Sport';
import { Location } from './Location';
import { Matches } from './Matches';
import { Visitor } from './Visitor';

export class Event {
  private id?: number;
  private name: string;
  private startDate: Date;
  private endDate: Date;
  private sport?: Sport;
  private location?: Location;
  private matches?: Matches[]; 
  private visitors?: Visitor[];

  constructor(event: {
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
    sport?: Sport;
    location?: Location;
    matches?: Matches[];
    visitors?: Visitor[];
  }) {
    this.validate(event);

    this.id = event.id;
    this.name = event.name;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.sport = event.sport;
    this.location = event.location;
    this.matches = event.matches;
    this.visitors = event.visitors;
  }

  static from({
    id,
    name,
    startDate,
    endDate,
    sport,
    location,
    matches,
}: EventPrisma & {
    sport?: SportPrisma;
    location?: LocationPrisma;
    matches?: MatchesPrisma[];
}): Event {
    return new Event({
        id,
        name,
        startDate,
        endDate,
        sport: sport ? Sport.from(sport) : undefined,
        location: location ? Location.from(location) : undefined,
        matches: matches ? matches.map((match) => Matches.from(match)) : undefined,
    });
}


  getId(): number | undefined {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  getSport(): Sport | undefined {
    return this.sport;
  }

  getLocation(): Location | undefined {
    return this.location;
  }

  getMatches(): Matches[] | undefined {
    return this.matches;
  }

  getVisitors(): Visitor[] | undefined {
    return this.visitors;
  }

  setSport(sport: Sport): void {
    this.sport = sport;
  }
  
  setLocation(location: Location): void {
    this.location = location;
  }

  setMatches(matches: Matches[]): void {
    this.matches = matches;
  }

  setVisitors(visitors: Visitor[]): void {
    this.visitors = visitors;
  }

  setStartDate(startDate: Date): void {
    this.startDate = startDate;
  }

  setEndDate(endDate: Date): void {
    this.endDate = endDate
  }

  setName(name: string): void { 
    this.name = name;
  }
  

  validate(event: { name: string; startDate: Date; endDate: Date }): void {
    if (!event) {
      throw new Error('Event data is required');
    }
    if (!event.name) {
      throw new Error('Name is required');
    }
    if (!event.startDate || event.startDate.toString() === 'Invalid Date') {
      throw new Error('Start date is required');
    }
    if (!event.endDate || event.endDate.toString() === 'Invalid Date') {
      throw new Error('End date is required');
    }
    if (event.startDate > event.endDate) {
      throw new Error('Start date must be before end date');
    }
  }
}
