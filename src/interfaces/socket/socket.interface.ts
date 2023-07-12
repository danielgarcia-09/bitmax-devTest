export enum CoinSideEnum {
    BUY = 'Buy',
    SELL = 'Sell'
}

export enum CoinActionEnum {
    "INSERT" = "insert",
    "UPDATE" = "update",
    "DELETE" = "delete"
}
export interface PriceSocketDataI {
    action: CoinActionEnum;
    error?: string;
    data: PriceSocketDataItemI[];
}

export interface PriceSocketDataItemI {
    symbol: string;
    side: CoinSideEnum;
    size: number;
    price: number;
    timestamp: string;
}