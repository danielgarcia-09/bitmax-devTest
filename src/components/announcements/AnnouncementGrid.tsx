"use client"

import { useAppSelector } from "@/redux/hooks"
import AnnouncementGridItem from "./AnnouncementGridItem";

const AnnouncementGrid = () => {

    const announcements = useAppSelector(state => state.announcement.announcements);

    return (
        <div className="mt-16">
            {(announcements && announcements.length > 0) ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-auto gap-5">
                    {announcements.map((announcement) => (
                        <AnnouncementGridItem key={announcement.uuid} {...announcement} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-96">
                    <h1 className="text-3xl font-bold text-gray-500">No Announcements Found</h1>
                </div>
            )}
        </div>
    )
}

export default AnnouncementGrid;