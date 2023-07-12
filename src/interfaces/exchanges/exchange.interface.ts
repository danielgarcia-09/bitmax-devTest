
export enum CoinActionEnum {
    "insert" = "Insert",
    "update" = "Update",
    "delete" = "Delete"
}

export interface ExchangePayloadI {
    table: string;
    action: CoinActionEnum;
    data: ExchangeI[];
}

export interface ExchangeI {
    id: number;
    symbol: string;
    action: CoinActionEnum;
    side: string;
    size: number;
    price: number;
    timestamp: string
}

export type ExchangeIKeys = Array<keyof ExchangeI> | Array<string>;