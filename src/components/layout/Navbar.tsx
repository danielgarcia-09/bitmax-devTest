import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
    { name: "Home", path: "/" },
    { name: "Announcements", path: "/announcements" }
]

const Navbar = () => {

    const pathname = usePathname();

    return (
        <nav className="sticky top-0 z-10 bg-transparent backdrop-filter backdrop-blur-lg bg-opacity-30">
            <div className="w-full mx-auto px-6">
                <div className="flex items-center justify-between h-20 py-3">
                    <span className="text-2xl text-gray-900 font-semibold">
                        <Image src={'https://upload.wikimedia.org/wikipedia/commons/5/58/Bitmex_logo.svg'} alt="logo" width={180} height={180} />
                    </span>
                    <div className="flex space-x-4 text-gray-900">
                        {routes.map((route) => (
                            <Link
                                key={route.name}
                                className={`${ pathname === route.path ? "text-blue-500" : ""} px-3 py-2 rounded-md text-sm font-medium`}
                                href={route.path}
                            >{route.name}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;