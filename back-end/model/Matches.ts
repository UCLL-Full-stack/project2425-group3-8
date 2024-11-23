import { Matches as MatchesPrisma } from '@prisma/client';

export class Matches {
    private id?: number;
    private winner: string;
    private result: string;
    private date: Date;
    private hour: string;
    private eventId?: number | null; // eventId can be null

    constructor(matches: { id?: number, winner: string, result: string, date: Date, hour: string, eventId?: number | null }) {
        this.id = matches.id;
        this.winner = matches.winner;
        this.result = matches.result;
        this.date = matches.date;
        this.hour = matches.hour;
        this.eventId = matches.eventId;
    }

    static from({
        id,
        winner,
        result,
        date,
        hour,
        eventId
    }: MatchesPrisma): Matches {
        return new Matches({
            id,
            winner,
            result,
            date,
            hour,
            eventId
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getWinner(): string {
        return this.winner;
    }

    getResult(): string {
        return this.result;
    }

    getDate(): Date {
        return this.date;
    }

    getHour(): string {
        return this.hour;
    }

    getEventId(): number | null | undefined {
        return this.eventId;
    }
}