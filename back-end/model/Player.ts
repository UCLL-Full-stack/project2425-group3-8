import { User } from "./User";
import { Location } from "./Location";
import { Player as PlayerPrisma, Location as LocationPrisma, User as UserPrisma, Matches as MatchesPrisma} from '@prisma/client'
import { Matches } from "./Matches";

export class Player extends User {
    private playerId?: number;
    private address?: Location;
    private age: number;
    private experience: number;
    private matches?: Matches[];
    private team: string;

    constructor(player: {user: User; playerId?: number; age: number; experience:number; address?: Location, matches?: Matches[], team: string}) {
        super({id: player.user.getId(), fullName: player.user.getFullName(), phoneNumber: player.user.getPhoneNumber(), email: player.user.getEmail(), password: player.user.getPassword()});

        this.playerId = player.playerId;
        this.age = player.age;
        this.experience = player.experience;
        this.matches = player.matches;
        this.team = player.team;
    }

    static fromPlayer(player: PlayerPrisma): Player {

        return new Player({

            playerId: player.playerId,

            user: new User({ id: player.userId, fullName: '', phoneNumber: '', email: '', password: '' }),

            address: new Location({ id: player.addressid, city: '', cityCode: '', street: '', number: 0}),

            age: player.age,

            experience: player.experience,

            matches: [], 

            team: player.team

        });

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

    getMatches(): Matches[] | undefined {
        return this.matches;
    }

    getTeam(): string {
        return this.team;
    }
}
