import { Event as EventPrisma, Sport as SportPrisma, Location as LocationPrisma, Matches as MatchesPrisma } from '@prisma/client';
import { Sport } from './Sport';
import { Location } from './Location';
import { Matches } from './Matches';

export class Event {
  private id?: number;
  private name: string;
  private startDate: Date;
  private endDate: Date;
  private sport?: Sport;
  private location?: Location;
  private matches?: Matches[];  // Add this to hold related matches

  constructor(event: {
    id?: number;
    name: string;
    startDate: Date;
    endDate: Date;
    sport?: Sport;
    location?: Location;
    matches?: Matches[];
  }) {
    this.validate(event);

    this.id = event.id;
    this.name = event.name;
    this.startDate = event.startDate;
    this.endDate = event.endDate;
    this.sport = event.sport;
    this.location = event.location;
    this.matches = event.matches;
  }

  static from({
    id,
    name,
    startDate,
    endDate,
    sport,
    location,
    matches,
  }: EventPrisma & { sport: SportPrisma; location: LocationPrisma; matches: MatchesPrisma[] }) {
    return new Event({
      id,
      name,
      startDate,
      endDate,
      sport: Sport.from(sport),
      location: Location.from(location),
      matches: matches.map((match) => Matches.from(match)), 
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

  validate(event: { name: string; startDate: Date; endDate: Date }) {
    if (!event.startDate || !event.endDate) {
      throw new Error('Start and end date are required');
    }

    if (event.startDate > event.endDate) {
      throw new Error('Start date cannot be after end date');
    }
    if (!event.name) {
      throw new Error('Name is required');
    }
  }
}
