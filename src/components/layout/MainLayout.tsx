import { ReduxProvider } from "@/redux/provider";
import Navbar from "./Navbar";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ReduxProvider>
            <Navbar />
            {children}
        </ReduxProvider>
    )
}

export default MainLayout;