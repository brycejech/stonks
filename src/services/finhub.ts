import Axios from 'axios';

export interface IStockQuote {
    currentPrice: number; // c
    highPrice: number; // h
    lowPrice: number; // l
    openPrice: number; // o
    previousClose: number; // pc
}

export interface IFinhubQuoteResponse {
    data: IFinhubQuote;
}

export interface IFinhubQuote {
    c: number;
    h: number;
    l: number;
    o: number;
    pc: number;
    t: number;
}

class FinhubService {
    private baseUrl = 'https://finnhub.io/api/v1';
    private apiKey = process.env.REACT_APP_FINHUB_KEY;

    async getQuote(symbol: string): Promise<IStockQuote> {
        symbol = (symbol || '').toUpperCase();

        const url = `${this.baseUrl}/quote?symbol=${symbol}&token=${this.apiKey}`;

        const res: IFinhubQuoteResponse = await Axios.get(url);

        const { data } = res;

        return {
            currentPrice: data.c,
            highPrice: data.h,
            lowPrice: data.l,
            openPrice: data.o,
            previousClose: data.pc,
        };
    }
}

export const finhubService = new FinhubService();
