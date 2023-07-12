import { AnnouncementI } from "@/interfaces/announcements/announcement.interface";

const AnnouncementGridItem = (props: AnnouncementI) => {
    const { uuid, content, date, link, title } = props;

    return (
        <div key={uuid} className="flex flex-col gap-3 w-auto rounded-md shadow-lg bg-white transform transition duration-500 hover:scale-105 p-4 h-max">
            <div className="flex flex-wrap items-center justify-between px-1 py-3">
                <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>
                <span className="text-gray-500">{new Date(date).toLocaleString()}</span>
            </div>
            <p className="text-gray-500 text-sm">{content}</p>

            <a
                href={link}
                className="text-white bg-green-500 hover:bg-green-600 w-1/2 text-center font-semibold py-2 px-3 rounded-md"
                target="_blank"
                rel="noopener noreferrer"
            >
                Visit Website
            </a>
        </div>
    )
}

export default AnnouncementGridItem;