import React from 'react';
import { ITradeSummary } from '../types';
import { formatCurrency } from '../utilities';

export interface IStockTradeTableSummaryProps {
    summary: ITradeSummary;
}

export function StockTradeTableSummary(
    props: IStockTradeTableSummaryProps
): JSX.Element {
    const { summary } = props;
    return (
        <table className="stock-trade-table-summary">
            <thead>
                <tr>
                    <th>Shares</th>
                    <th>Debits</th>
                    <th>Credits</th>
                    <th>Average Buy</th>
                    <th>Average Sell</th>
                    <th>Profit/Loss</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{summary.shares}</td>
                    <td>{formatCurrency(summary.debits)}</td>
                    <td>{formatCurrency(summary.credits)}</td>
                    <td>{formatCurrency(summary.averageBuy)}</td>
                    <td>{formatCurrency(summary.averageSell)}</td>
                    <td>{formatCurrency(summary.profitLoss)}</td>
                </tr>
            </tbody>
        </table>
    );
}
