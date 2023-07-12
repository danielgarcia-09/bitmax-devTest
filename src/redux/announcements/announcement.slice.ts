import { AnnouncementI } from "@/interfaces/announcements/announcement.interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface InitialStateI {
    announcements: AnnouncementI[]
}

const initialState: InitialStateI = { announcements: [] }

export const announcementSlice = createSlice({
    initialState,
    name: "announcement",
    reducers: {
        setAnnouncements: (state: InitialStateI, action: PayloadAction<AnnouncementI[]>) => {
            state.announcements = action.payload
        }
    }
})


export const { setAnnouncements } = announcementSlice.actions

export default announcementSlice.reducer