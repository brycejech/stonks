import { SecurityType } from '../constants';

export class StockTrade {
    id: number;
    type: string;
    tradeType: 'Buy' | 'Sell';

    date: Date | string;
    symbol: string;
    price: number;
    quantity: number;

    constructor(trade: StockTrade) {
        this.id = trade.id;
        this.type = SecurityType.STOCK;
        this.tradeType = trade.tradeType;
        this.date = trade.date ? new Date(trade.date) : new Date();
        this.symbol = (trade.symbol || '').toUpperCase();
        this.price = +trade.price;
        this.quantity = +trade.quantity;
    }
}
