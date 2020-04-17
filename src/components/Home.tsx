import React, { useState, useEffect } from 'react';
import {
    SearchComponent,
    StockTradeTable,
    StockTradeTableSummary,
    StockQuoteComponent,
} from '.';
import { tradeService } from '../services';
import { StockTrade, ITradeSummary } from '../types';
import { getTradeSummary } from '../utilities/get-trade-summary';

export interface IHomeProps {
    path: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// eslint-disable-next-line no-unused-vars
export function Home(props: IHomeProps): JSX.Element {
    // State
    const [trades, setTrades] = useState<StockTrade[]>([]),
        [search, setSearch] = useState<string>('');

    const tradeSummary: ITradeSummary = getTradeSummary(trades);

    // Effects
    useEffect(() => {
        if (search) {
            tradeService.getStockTradesBySymbol(search).then(setTrades);
        } else {
            tradeService.getStockTrades().then(setTrades);
        }
    }, [search]);

    return (
        <div className="home">
            <SearchComponent label="Search Symbols" onKeyup={setSearch} />
            <StockTradeTable trades={trades} />
            <StockTradeTableSummary summary={tradeSummary} />
            <StockQuoteComponent />
        </div>
    );
}
