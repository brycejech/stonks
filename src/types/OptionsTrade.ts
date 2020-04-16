import { OptionContract } from './OptionContract';
import { SecurityType } from '../constants';

export class OptionsTrade {
    id: number;
    type: string;
    symbol: string;
    debits: number;
    credits: number;
    profitLoss: number;

    options: OptionContract[];

    constructor(trade: OptionsTrade) {
        this.id = trade.id;
        this.type = SecurityType.OPTION;
        this.symbol = trade.symbol;
        this.debits = trade.debits;
        this.credits = trade.credits;
        this.profitLoss = trade.profitLoss;

        this.options = trade.options;
    }
}
