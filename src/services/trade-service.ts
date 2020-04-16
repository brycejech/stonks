import { StockTrade } from '../types';
import { stockTrades } from './mocks';
import { escapeRegex } from '../utilities';

class TradeService {
    getStockTrades(): Promise<StockTrade[]> {
        return new Promise((resolve) => {
            resolve(stockTrades);
        });
    }

    getStockTradesBySymbol(symbol: string): Promise<StockTrade[]> {
        symbol = (symbol || '').toUpperCase();
        const exp = new RegExp(escapeRegex(symbol), 'i');
        return new Promise((resolve) => {
            const trades = stockTrades.filter((t) => exp.test(t.symbol));
            resolve(trades);
        });
    }
}

export const tradeService = new TradeService();
