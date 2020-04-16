export class Trade {
    type: string;
    openedOn: Date | string;
    closedOn: Date | string;
    symbol: string;
    quantity: number;
    priceFilled: number;
    priceClosed: number;
    profit: number;

    comment: string;

    constructor(trade: Trade) {
        this.type = trade.type;
        this.openedOn = trade.openedOn ? new Date(trade.openedOn) : '';
        this.closedOn = trade.closedOn ? new Date(trade.closedOn) : '';
        this.symbol = trade.symbol;
        this.quantity = trade.quantity;
        this.priceFilled = trade.priceFilled || 0;
        this.priceClosed = trade.priceClosed || 0;
        this.profit = trade.profit || this.priceFilled - this.priceClosed || 0;

        this.comment = trade.comment;
    }
}
