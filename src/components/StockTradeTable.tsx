import React from 'react';

import { StockTrade } from '../types';
import { formatDate, formatCurrency } from '../utilities';

export interface IStockTradeTableProps {
    trades: StockTrade[];
}

export function StockTradeTable(props: IStockTradeTableProps): JSX.Element {
    return (
        <table className="stock-trade-table">
            <thead>
                <tr>
                    <th>Symbol</th>
                    <th>Trade Type</th>
                    <th>Date</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Credit</th>
                </tr>
            </thead>
            <tbody>
                {props.trades.map((t: StockTrade) => {
                    const credit: string = formatCurrency(
                        t.price * t.quantity * (t.tradeType === 'Sell' ? 1 : -1)
                    );
                    return (
                        <tr key={t.id}>
                            <td>{t.symbol}</td>
                            <td>{t.tradeType}</td>
                            <td>{formatDate(t.date)}</td>
                            <td>{formatCurrency(t.price)}</td>
                            <td>{t.quantity}</td>
                            <td>{credit}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}
