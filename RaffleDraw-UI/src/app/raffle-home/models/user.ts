import { RaffleData } from './raffle-data';

export class User {
    userId: string;
    userName: string;
    password: string;
    isAdmin: string;
    role: string;
    lastLoginDate: Date;
    raffles: Array<RaffleData>;
}
