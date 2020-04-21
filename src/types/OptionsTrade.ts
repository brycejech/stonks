import { OptionContract } from './OptionContract';
import { SecurityType } from '../constants';


function isCallDebitSpread(options: OptionContract[]): boolean {
    const calls: OptionContract[] = options.filter(
        (t) => t.optionType === 'Call'
    );

    if (!calls.length) return false;

    const buys: OptionContract[] = calls.filter((t) => t.tradeType === 'Buy');
    const sells: OptionContract[] = calls.filter((t) => t.tradeType === 'Sell');

    if (!(buys.length && sells.length)) return false;

    let highestBuy: OptionContract = buys[0];
    for (const trade of buys) {
        if (trade.strikePrice > highestBuy.strikePrice) {
            highestBuy = trade;
        }
    }

    let lowestSell: OptionContract = sells[0];
    for (const trade of sells) {
        if (trade.strikePrice < lowestSell.strikePrice) {
            lowestSell = trade;
        }
    }

    if (highestBuy.strikePrice < lowestSell.strikePrice) return true;

    return false;
}

function isCallCreditSpread(options: OptionContract[]): boolean {
    const calls: OptionContract[] = options.filter(
        (t) => t.optionType === 'Call'
    );

    if (!calls.length) return false;

    const buys: OptionContract[] = calls.filter((t) => t.tradeType === 'Buy');
    const sells: OptionContract[] = calls.filter((t) => t.tradeType === 'Sell');

    let lowestBuy: OptionContract = buys[0];
    for (const trade of buys) {
        if (trade.strikePrice < lowestBuy.strikePrice) {
            lowestBuy = trade;
        }
    }

    let highestSell: OptionContract = sells[0];
    for (const trade of sells) {
        if (trade.strikePrice > highestSell.strikePrice) {
            highestSell = trade;
        }
    }

    if (highestSell.strikePrice < lowestBuy.strikePrice) return true;

    return false;
}

function isPutCreditSpread(options: OptionContract[]): boolean {
    const puts: OptionContract[] = options.filter(
        (t) => t.optionType === 'Put'
    );

    if (!puts.length) return false;

    const buys: OptionContract[] = puts.filter((p) => p.tradeType === 'Buy');
    const sells: OptionContract[] = puts.filter((p) => p.tradeType === 'Sell');

    if (!(buys.length && sells.length)) return false;

    let lowestSell: OptionContract = sells[0];
    for (const trade of sells) {
        if (trade.strikePrice < lowestSell.strikePrice) {
            lowestSell = trade;
        }
    }

    let highestBuy: OptionContract = buys[0];
    for (const trade of buys) {
        if (trade.strikePrice > highestBuy.strikePrice) {
            highestBuy = trade;
        }
    }

    if (lowestSell.strikePrice > highestBuy.strikePrice) return true;

    return false;
}

function isPutDebitSpread(options: OptionContract[]): boolean {
    const puts: OptionContract[] = options.filter(
        (t) => t.optionType === 'Put'
    );

    if (!puts.length) return false;

    const buys: OptionContract[] = puts.filter((p) => p.tradeType === 'Buy');
    const sells: OptionContract[] = puts.filter((p) => p.tradeType === 'Sell');

    if (!(buys.length && sells.length)) return false;

    let lowestBuy: OptionContract = buys[0];
    for (const trade of buys) {
        if (trade.strikePrice < lowestBuy.strikePrice) {
            lowestBuy = trade;
        }
    }

    let highestSell: OptionContract = sells[0];
    for (const trade of sells) {
        if (trade.strikePrice > highestSell.strikePrice) {
            highestSell = trade;
        }
    }

    if (lowestBuy.strikePrice > highestSell.strikePrice) return true;

    return false;
}

function isIronCondor(options: OptionContract[]): boolean {
    return isCallCreditSpread(options) && isPutCreditSpread(options);
}

function isBoxSpread(options: OptionContract[]): boolean {
    return isCallDebitSpread(options) && isPutDebitSpread(options);
}

function getOptionTradeType(options: OptionContract[]): string {

    if(isIronCondor(options)){
        return 'Iron Condor';
    }
    else if(isBoxSpread(options)){
        return 'Box Spread';
    }
    else if(isCallCreditSpread(options)){
        return 'Call Credit Spread';
    }
    else if(isCallDebitSpread(options)){
        return 'Call Debit Spread';
    }
    else if(isPutCreditSpread(options)){
        return 'Put Credit Spread';
    }
    else if(isPutDebitSpread(options)){
        return 'Put Debit Spread';
    }
    // TODO: Simple call/put
    else{
        return 'Unknown';
    }
}


export class OptionsTrade {
    id: number;
    type: string;
    optionTradeType: string;
    symbol: string;
    debits: number;
    credits: number;
    profitLoss: number;

    options: OptionContract[];

    constructor(trade: OptionsTrade) {
        this.id = trade.id;
        this.type = SecurityType.OPTION;
        this.optionTradeType = getOptionTradeType(trade.options);
        this.symbol = trade.symbol;
        this.debits = 0;
        this.credits = 0;

        this.options = trade.options;

        trade.options.forEach((o) => {
            if (o.tradeType === 'Buy') {
                this.debits += +o.price;
            } else if (o.tradeType === 'Sell') {
                this.credits += +o.price;
            }
        });

        this.profitLoss = this.credits - this.debits;


    }
}
