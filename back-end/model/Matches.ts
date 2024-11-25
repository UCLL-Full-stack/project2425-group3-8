import { Matches as MatchesPrisma, Player as PlayerPrisma } from '@prisma/client';
import { Player } from './Player';

export class Matches {
    private id?: number;
    private winner?: string | null;
    private result?: string | null;
    private date: Date;
    private hour: string;
    private team1: string;
    private team2: string;
    private eventId?: number | null; 
    private players?: Player[];

    constructor(matches: { id?: number, winner?: string | null, result?: string | null, date: Date, hour: string, team1: string, team2: string, eventId?: number | null, players?: Player[] }) {
        this.id = matches.id;
        this.winner = matches.winner;
        this.result = matches.result;
        this.date = matches.date;
        this.hour = matches.hour;
        this.eventId = matches.eventId;
        this.team1 = matches.team1;
        this.team2 = matches.team2;
        this.players = matches.players;
    }

    static from({
        id,
        winner,
        result,
        date,
        hour,
        team1,
        team2,
        eventId,
        players
    }: MatchesPrisma & {players?: PlayerPrisma[]}): Matches {
        return new Matches({
            id,
            winner,
            result,
            date,
            hour,
            team1,
            team2,
            eventId,
            players: players ? players.map(player => Player.fromPlayer(player)) : []
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getWinner(): string | null | undefined {
        return this.winner;
    }

    getResult(): string | null | undefined {
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