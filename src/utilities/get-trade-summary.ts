import { StockTrade, ITradeSummary } from '../types';

export function getTradeSummary(trades: StockTrade[]): ITradeSummary {
    const summary: ITradeSummary = {
        shares: 0,
        debits: 0,
        credits: 0,
        averageBuy: 0,
        averageSell: 0,
        profitLoss: 0,
    };

    trades.forEach((t) => {
        if (t.tradeType === 'Buy') {
            summary.shares += t.quantity;
            summary.debits += t.price;
        } else {
            summary.shares -= t.quantity;
            summary.credits += t.price;
        }
    });

    summary.averageBuy = summary.debits / trades.length || 0;
    summary.averageSell = summary.credits / trades.length || 0;
    summary.profitLoss = summary.averageSell - summary.averageBuy || 0;

    return summary;
}
