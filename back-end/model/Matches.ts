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
        this.validate(matches);
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

    getTeam1(): string {
        return this.team1;
    }

    getTeam2(): string {
        return this.team2;
    }

    getPlayers(): Player[] | undefined {
        return this.players;
    }

    validate(matches: { id?: number, winner?: string | null, result?: string | null, date: Date, hour: string, team1: string, team2: string, eventId?: number | null, players?: Player[] }) {
        if (!matches) {
            throw new Error('Matches data is required');
        }
        if (!matches.date || matches.date.toString() === 'Invalid Date') {
            throw new Error('Date is required');
        }
        if (!matches.hour) {
            throw new Error('Hour is required');
        }
        if (matches.hour < '00:00' || matches.hour > '23:59') {
            throw new Error('Hour must be between 00:00 and 23:59');
        }
        if (!matches.team1) {
            throw new Error('Team 1 is required');
        }
        if (!matches.team2) {
            throw new Error('Team 2 is required');
        }
    }
}