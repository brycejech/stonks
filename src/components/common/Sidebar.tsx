import React from 'react';
import { StockQuoteComponent } from '../StockQuoteComponent';

export function Sidebar(): JSX.Element {
    return (
        <div className="sidebar">
            <StockQuoteComponent />
        </div>
    );
}
