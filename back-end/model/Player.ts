export class Player{
    private id?: number;
    private address: string;
    private age: number;
    private experiance: number;

    constructor(player: {id?: number, address: string, age: number, experiance: number}){
        this.id = player.id;
        this.address = player.address;
        this.age = player.age;
        this.experiance = player.experiance;
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

    getExperiance(): number{
        return this.experiance;
    }
}