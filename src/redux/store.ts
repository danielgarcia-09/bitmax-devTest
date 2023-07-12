import { configureStore } from '@reduxjs/toolkit'
import announcementReducer from './announcements/announcement.slice';
import exchangeReducer from './exchange/exchange.slice';

export const store = configureStore({
  reducer: {
    announcement: announcementReducer,
    exchange: exchangeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch