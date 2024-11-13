import { User } from "./User";
import { Location } from "./Location";
import { Player as PlayerPrisma, Location as LocationPrisma} from '@prisma/client'

export class Player extends User {
    private playerId?: number;
    private address?: Location;
    private age: number;
    private experience: number;

    constructor(player: {
        id?: number;
        fullName: string;
        phoneNumber: string;
        email: string;
        playerId?: number; 
        address?: Location;
        age: number;
        experience: number;
    }) {
        super({
            id: player.id,
            fullName: player.fullName,
            phoneNumber: player.phoneNumber,
            email: player.email
        });

        this.playerId = player.playerId;
        this.address = player.address;
        this.age = player.age;
        this.experience = player.experience;
    }

static from({
    id,
    fullName,
    phoneNumber,
    email,
    playerId,
    address,
    age,
    experience
}: PlayerPrisma & { address: LocationPrisma}){
    return new Player({
        id,
        fullName,
        phoneNumber,
        email,
        playerId,
        address: Location.from(address),
        age,
        experience
    })
}

    getPlayerId(): number | undefined {
        return this.playerId;
    }

    getAddress(): Location | undefined {
        return this.address;
    }

    getAge(): number {
        return this.age;
    }

    getExperience(): number {
        return this.experience;
    }
}
