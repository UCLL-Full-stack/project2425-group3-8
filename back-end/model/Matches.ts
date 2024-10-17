export class Matches{
    private id?: number;
    private winner: string;
    private result: string;
    private date: Date;
    private hour: string;

    constructor(matches: {id?: number, winner: string, result: string, date: Date, hour: string}){
        this.id = matches.id;
        this.winner = matches.winner;
        this.result = matches.result;
        this.date = matches.date;
        this.hour = matches.hour;
    }

    getId(): number | undefined{
        return this.id;
    }

    getWinner(): string{
        return this.winner;
    }

    getResult(): string{
        return this.result;
    }

    getDate(): Date{
        return this.date;
    }

    getHour(): string{
        return this.hour;
    }
}