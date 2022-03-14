import { RaffleWinner } from './raffle-winner';

export class RaffleData {
    _id: string;
    raffleName: string;
    raffleDate: string;
    promotion: any;
    raffleType: number;
    winners: Array<RaffleWinner>;
    isCompleted: boolean;
    createdBy: string;
    createdOn: string;
    assignedTo: Array<any>;
    participants: Array<any>;
    raffleDataFileName: string;
}