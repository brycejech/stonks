import { formatDate } from '../utilities';

export class OptionContract {
    id: number;
    reference: string;
    tradeType: 'Buy' | 'Sell';
    optionType: 'Call' | 'Put';
    strikePrice: number;
    expiration: Date | string;
    price: number;
    quantity: number;

    constructor(opt: OptionContract) {
        this.id = opt.id;
        this.reference =
            opt.reference ||
            `${opt.strikePrice}-${opt.optionType}-${formatDate(
                opt.expiration
            )}`;
        this.tradeType = opt.tradeType;
        this.optionType = opt.optionType;
        this.strikePrice = +opt.strikePrice;
        this.expiration = new Date(opt.expiration);
        this.price = +opt.price || 0;
        this.quantity = +opt.quantity || 0;
    }
}
