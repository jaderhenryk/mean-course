export class BillingCycle {
    _id: string;
    credits: any[];
    debts: any[]
    constructor(
        public name:string,
        public month:number,
        public year:number
    ) {}
}