import { StockTrade, OptionsTrade } from '../types';
import { stockTrades, optionsTrades } from './mocks';
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

    getOptionsTrades(): Promise<OptionsTrade[]>{
        return new Promise((resolve) => {
            resolve(optionsTrades.map(o => new OptionsTrade(o)));
        });
    }

    getOptionsTradesBySymbol(symbol: string): Promise<OptionsTrade[]>{
        return new Promise((resolve) => {
            const exp = new RegExp(escapeRegex(symbol), 'i');
            const trades = optionsTrades
                .map(o => new OptionsTrade(o))
                .filter(t => exp.test(t.symbol));

            resolve(trades);
        });
    }
}

export const tradeService = new TradeService();
