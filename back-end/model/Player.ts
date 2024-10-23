export class Player{
    private id?: number;
    private address: string;
    private age: number;
    private experience: number;

    constructor(player: {id?: number, address: string, age: number, experience: number}){
        this.id = player.id;
        this.address = player.address;
        this.age = player.age;
        this.experience = player.experience;
    }

    getId(): number | undefined{
        return this.id;
    }

    getAddress(): string{
        return this.address;
    }

    getAge(): number{
        return this.age;
    }

    getExperience(): number{
        return this.experience;
    }
}