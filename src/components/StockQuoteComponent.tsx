import React, { useState } from 'react';
import { finhubService, IStockQuote } from '../services';

export function StockQuoteComponent(): JSX.Element {
    const [symbol, setSymbol] = useState<string>(''),
        [quote, setQuote] = useState<IStockQuote>();

    async function getQuote(): Promise<void> {
        const quote = await finhubService.getQuote(symbol);

        setQuote(quote);
    }

    return (
        <div className="quote-container">
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

            <button
                onClick={(): void => {
                    getQuote();
                }}
            >
                Search
            </button>

            <table>
                <thead>
                    <tr>
                        <th>Current Price</th>
                        <th>Open</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Previous Close</th>
                    </tr>
                </thead>
                {quote && (
                    <tbody>
                        <tr>
                            <td>{quote.currentPrice}</td>
                            <td>{quote.openPrice}</td>
                            <td>{quote.highPrice}</td>
                            <td>{quote.lowPrice}</td>
                            <td>{quote.previousClose}</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
}
