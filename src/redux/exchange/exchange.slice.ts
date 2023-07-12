import { ExchangeI } from "@/interfaces/exchanges/exchange.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateI {
    exchanges: ExchangeI[]
}

const initialState: InitialStateI = { exchanges: [] }

export const exchangeSlice = createSlice({
    initialState,
    name: "exchange",
    reducers: {
        setExchanges: (state: InitialStateI, action: PayloadAction<ExchangeI[]>) => {
            state.exchanges = [...action.payload, ...state.exchanges]
            
            if (state.exchanges.length >= 10) {
                state.exchanges = state.exchanges.slice(0, 10)
            }
        }
    }
})

export const { setExchanges } = exchangeSlice.actions
export default exchangeSlice.reducer