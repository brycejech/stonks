interface TradeType {
    BTO: string;
    STC: string;
    STO: string;
    BTC: string;
}

export const TradeType: TradeType = {
    BTO: 'Buy to Open',
    STC: 'Sell to Close',
    STO: 'Sell to Open',
    BTC: 'Buy to Close',
};
