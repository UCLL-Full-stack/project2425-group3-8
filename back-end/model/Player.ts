import { User } from "./User";
import { Location } from "./Location";
import { Player as PlayerPrisma, Location as LocationPrisma, User as UserPrisma} from '@prisma/client'

export class Player extends User {
    private playerId?: number;
    private address?: Location;
    private age: number;
    private experience: number;

    constructor(player: {user: User; playerId?: number; age: number; experience:number; address?: Location}) {
        super({id: player.user.getId(), fullName: player.user.getFullName(), phoneNumber: player.user.getPhoneNumber(), email: player.user.getEmail(), password: player.user.getPassword()});

        this.playerId = player.playerId;
        this.age = player.age;
        this.experience = player.experience;
    }

static fromPlayer({
    user,
    address,
    age,
    experience
}: PlayerPrisma & { address: LocationPrisma; user: UserPrisma}): Player{
    const userObj = User.from(user)
    const locationObj = address ? Location.from(address) : undefined;
    return new Player({
        user: userObj,
        address: locationObj,
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
