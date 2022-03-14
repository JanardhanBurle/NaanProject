import { Prize } from './prize';

export class PromotionData {
    _id: string;
    promoName: string;
    promoType: any;
    scheduledDate: Date;
    winnerType: number;
    approvalRequired: boolean;
    noOfWinners: number;
    noOfPrizes: number;
    standByWinnerRequired: boolean;
    prizes: Array<Prize>;
    isCompleted: boolean;
    view_promo: any;
}
