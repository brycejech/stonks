import React, { useState } from 'react';
import { finhubService, IStockQuote } from '../services';
import { formatCurrency } from '../utilities';

export function StockQuoteComponent(): JSX.Element {
    const [symbol, setSymbol] = useState<string>(''),
        [quote, setQuote] = useState<IStockQuote>();

    async function getQuote(): Promise<void> {
        const quote = await finhubService.getQuote(symbol);

        setQuote(quote);
    }

    return (
        <div className="quote-container">
            <form
                onSubmit={(e): void => {
                    e.preventDefault();
                    getQuote();
                }}
            >
                <div className="form-group">
                    <label htmlFor="quote">
                        <strong>Get Quote</strong>
                        <br></br>
                    </label>
                    <input
                        type="text"
                        id="quote"
                        value={symbol}
                        onChange={(e): void => {
                            const val = e.target.value.toUpperCase();
                            e.target.value = val;
                            setSymbol(val);
                        }}
                    />
                </div>
            </form>
            <table className="inverted text-left">
                {quote && (
                    <tbody>
                        <tr>
                            <th className="shrink">Symbol</th>
                            <td>{symbol}</td>
                        </tr>
                        <tr>
                            <th className="shrink">Current</th>
                            <td>{formatCurrency(quote.currentPrice)}</td>
                        </tr>
                        <tr>
                            <th className="shrink">Open</th>
                            <td>{formatCurrency(quote.openPrice)}</td>
                        </tr>
                        <tr>
                            <th className="shrink">High</th>
                            <td>{formatCurrency(quote.highPrice)}</td>
                        </tr>
                        <tr>
                            <th className="shrink">Low</th>
                            <td>{formatCurrency(quote.lowPrice)}</td>
                        </tr>
                        <tr>
                            <th className="shrink">Prev Close</th>
                            <td>{formatCurrency(quote.previousClose)}</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
}
