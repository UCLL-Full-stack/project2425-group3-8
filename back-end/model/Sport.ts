import {Event as EventPrisma, Sport as SportPrisma, Location as LocationPrisma} from '@prisma/client';

export class Sport{
    private id?: number;
    private playerCount: number;
    private name: string;

    constructor(sport: {id?: number,  playerCount: number, name: string}){
        this.validate(sport);
        this.id = sport.id;
        this.playerCount = sport.playerCount;
        this.name = sport.name;
    }

static from({
    id,
    playerCount,
    name
}: SportPrisma) {
    return new Sport({
        id,
        playerCount,
        name
    });
}

    getId(): number | undefined{
        return this.id;
    }

    getPlayerCount(): number{
        return this.playerCount;
    }

    getName(): string{
        return this.name;
    }

    validate(sport: {id?: number, playerCount: number, name: string}){
        if(!sport){
            throw new Error('Sport data is required');
        }
        if(!sport.playerCount){
            throw new Error('Player count is required');
        }
        if(!sport.name){
            throw new Error('Name is required');
        }
    }
}