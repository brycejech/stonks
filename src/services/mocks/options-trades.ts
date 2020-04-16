import { OptionsTrade, OptionContract } from '../../types';

export const optionsTrades: OptionsTrade[] = [
    // SPY call-debit spread
    {
        id: 1,
        type: '',
        symbol: 'SPY',
        debits: 0,
        credits: 0,
        profitLoss: 0,
        options: [
            {
                id: 1,
                reference: '210-Call-04/17/2020',
                tradeType: 'Buy',
                optionType: 'Call',
                strikePrice: 210,
                expiration: new Date('04/17/2020'),
                price: 0.3,
                quantity: 10,
            },
            {
                id: 2,
                reference: '212-Call-04/17/2020',
                tradeType: 'Sell',
                optionType: 'Call',
                strikePrice: 212,
                expiration: new Date('04/17/2020'),
                price: 0.2,
                quantity: 10,
            },
        ],
    },
    // CCL call-credit spread
    {
        id: 2,
        type: '',
        symbol: 'CCL',
        debits: 0,
        credits: 0,
        profitLoss: 0,
        options: [
            {
                id: 3,
                reference: '',
                tradeType: 'Sell',
                optionType: 'Call',
                strikePrice: 23.5,
                expiration: new Date('04/17/2020'),
                price: 0.2,
                quantity: 5,
            },
            {
                id: 4,
                reference: '',
                tradeType: 'Buy',
                optionType: 'Call',
                strikePrice: 25,
                expiration: new Date('04/17/2020'),
                price: 0.2,
                quantity: 5,
            },
        ],
    },
    // NCLH put-credit spread
    {
        id: 3,
        type: '',
        symbol: 'NCLH',
        debits: 0,
        credits: 0,
        profitLoss: 0,
        options: [
            {
                id: 5,
                reference: '',
                tradeType: 'Sell',
                optionType: 'Put',
                strikePrice: 11.5,
                expiration: new Date('04/17/2020'),
                price: 0.3,
                quantity: 3,
            },
            {
                id: 6,
                reference: '',
                tradeType: 'Buy',
                optionType: 'Put',
                strikePrice: 10.5,
                expiration: new Date('04/17/2020'),
                price: 0.1,
                quantity: 3,
            },
        ],
    },
    // LB put-debit spread
    {
        id: 4,
        type: '',
        symbol: 'LB',
        debits: 0,
        credits: 0,
        profitLoss: 0,
        options: [
            {
                id: 7,
                reference: '',
                tradeType: 'Buy',
                optionType: 'Put',
                strikePrice: 11.5,
                expiration: new Date('04/17/2020'),
                price: 0.1,
                quantity: 3,
            },
            {
                id: 8,
                reference: '',
                tradeType: 'Sell',
                optionType: 'Put',
                strikePrice: 10.5,
                expiration: new Date('04/17/2020'),
                price: 0.3,
                quantity: 3,
            },
        ],
    },
    // SNAP iron condoor
    {
        id: 5,
        type: '',
        symbol: 'SNAP',
        debits: 0,
        credits: 0,
        profitLoss: 0,
        options: [
            {
                id: 9,
                reference: '',
                tradeType: 'Sell',
                optionType: 'Put',
                strikePrice: 11.5,
                expiration: new Date('04/17/2020'),
                price: 0.3,
                quantity: 3,
            },
            {
                id: 10,
                reference: '',
                tradeType: 'Buy',
                optionType: 'Put',
                strikePrice: 10.5,
                expiration: new Date('04/17/2020'),
                price: 0.1,
                quantity: 3,
            },
            {
                id: 11,
                reference: '',
                tradeType: 'Sell',
                optionType: 'Call',
                strikePrice: 13.5,
                expiration: new Date('04/17/2020'),
                price: 0.3,
                quantity: 3,
            },
            {
                id: 12,
                reference: '',
                tradeType: 'Buy',
                optionType: 'Call',
                strikePrice: 14.5,
                expiration: new Date('04/17/2020'),
                price: 0.1,
                quantity: 3,
            },
        ],
    },
];

function isCallDebitSpread(trade: OptionsTrade): boolean {
    const calls: OptionContract[] = trade.options.filter(
        (t) => (t.optionType = 'Call')
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

function isCallCreditSpread(trade: OptionsTrade): boolean {
    const calls: OptionContract[] = trade.options.filter(
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

function isPutCreditSpread(trade: OptionsTrade): boolean {
    const puts: OptionContract[] = trade.options.filter(
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

function isPutDebitSpread(trade: OptionsTrade): boolean {
    const puts: OptionContract[] = trade.options.filter(
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

function isIronCondor(trade: OptionsTrade): boolean {
    return isCallCreditSpread(trade) && isPutCreditSpread(trade);
}

// function isBoxSpread(trade: OptionsTrade): boolean {
//     return isCallDebitSpread(trade) && isPutDebitSpread(trade);
// }

console.log(Array(25).fill('-').join(''));
console.log(
    `${optionsTrades[0].symbol} isCallDebitSpread: ${isCallDebitSpread(
        optionsTrades[0]
    )}`
);

console.log(
    `${optionsTrades[1].symbol} isCallCreditSpread: ${isCallCreditSpread(
        optionsTrades[1]
    )}`
);

console.log(
    `${optionsTrades[2].symbol} isPutCreditSpread: ${isPutCreditSpread(
        optionsTrades[2]
    )}`
);

console.log(
    `${optionsTrades[3].symbol} isPutDebitSpread: ${isPutDebitSpread(
        optionsTrades[3]
    )}`
);

console.log(
    `${optionsTrades[4].symbol} isIronCondor: ${isIronCondor(optionsTrades[4])}`
);

console.log(
    `${optionsTrades[4].symbol} isCallCreditSpread: ${isCallCreditSpread(
        optionsTrades[4]
    )}`
);

console.log(
    `${optionsTrades[4].symbol} isPutCreditSpread: ${isPutCreditSpread(
        optionsTrades[4]
    )}`
);
console.log(Array(25).fill('-').join(''));

// console.log(`isBoxSpread: ${isBoxSpread(optionsTrades[0])}`);
