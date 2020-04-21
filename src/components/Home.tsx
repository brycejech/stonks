import React, { useState, useEffect } from 'react';
import { SearchComponent, StockTradeTable, StockTradeTableSummary } from '.';
import { tradeService } from '../services';
import { StockTrade, ITradeSummary } from '../types';
import { getTradeSummary } from '../utilities/get-trade-summary';

export interface IHomeProps {
    path: string;
}

(async () => {
    const optionsTrades = await tradeService.getOptionsTrades();

    console.log(optionsTrades);
})();

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
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="card mb-4">
                            <SearchComponent
                                label="Search Symbols"
                                onKeyup={setSearch}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <h1>Stonks</h1>
                            <StockTradeTable trades={trades} />
                            <StockTradeTableSummary summary={tradeSummary} />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="card">
                            <h1>Options</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
