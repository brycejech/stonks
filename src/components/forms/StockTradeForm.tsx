import React from 'react';

export function StockTradeForm(): JSX.Element {
    return (
        <div className="stock-trade-form">
            <form>
                <div className="form-group">
                    <label htmlFor="symbol">Symbol</label>
                    <div className="input-group">
                        <input
                            type="text"
                            id="input-group"
                            className="form-control"
                        />
                    </div>
                </div>
            </form>
        </div>
    );
}
