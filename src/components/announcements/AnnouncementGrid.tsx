"use client"

import { useAppSelector } from "@/redux/hooks"
import AnnouncementGridItem from "./AnnouncementGridItem";

const AnnouncementGrid = () => {
    
    const announcements = useAppSelector(state => state.announcement.announcements);
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-5">
            {announcements.map((announcement) => (
                <AnnouncementGridItem key={announcement.uuid} {...announcement} />
            ))}
        </div>
    )
}

export default AnnouncementGrid;