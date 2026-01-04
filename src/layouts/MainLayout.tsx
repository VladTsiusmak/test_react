import { Outlet } from "react-router-dom";
import { Header } from "../components/Header.tsx";

export const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-950 to-black text-white">
            <Header />

            <main className="flex-1 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <Outlet />
            </main>

            <footer className="py-8 text-center text-sm text-gray-500 border-t border-gray-800/50 bg-black/30 backdrop-blur-sm">
                <div className="container max-w-7xl mx-auto px-4">
                    © 2026 The Movies App. All rights reserved.
                </div>
            </footer>
        </div>
    );
};
