import { CoinActionEnum, CoinSideEnum } from "../entities/coin.interface";

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