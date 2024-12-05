import React from 'react';
import Link from 'next/link';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="bg-gray-800 text-white">
                <div className="container mx-auto flex justify-between items-center p-4">
                    <h1 className="text-lg font-bold">RateMyMovies</h1>
                    <nav>
                        <ul className="flex space-x-4">
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/movies">Movies</Link></li>
                            <li><Link href="/watchlist">Watchlist</Link></li>
                            <li><Link href="/login">Login</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>
            {/* Main Content */}
            <main className="flex-grow container mx-auto p-4">{children}</main>
            {/* Footer */}
            <footer className="bg-gray-800 text-white text-center p-4">
                &copy; 2024 RateMyMovies. All rights reserved.
            </footer>
        </div>
    );
};

export default Layout;