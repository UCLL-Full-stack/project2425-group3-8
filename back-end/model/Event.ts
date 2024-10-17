export class Event{
    private id?: number;
    private name: string;
    private startDate: Date; 
    private endDate: Date;

    constructor(event: {id?: number, name:string, startDate: Date, endDate: Date}){
        this.id = event.id;
        this.name = event.name;
        this.startDate = event.startDate;
        this.endDate = event.endDate;
    }

    getId(): number | undefined{
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getStartDate(): Date{
        return this.startDate
    }

    getEndDate(): Date{
        return this.endDate
    }

}