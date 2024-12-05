import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    const handleLogout = () => {
        // Clear any authentication tokens or states
        localStorage.removeItem("authToken"); // Example
        router.push("/login"); // Redirect to login page
    };

    return (
        <header className="bg-blue-500 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">RateMyMovie</h1>
                <nav>
                    <ul className="flex gap-4">
                        <li>
                            <Link href="/watchlist" className="hover:underline">
                                Watchlist
                            </Link>
                        </li>
                        <li>
                            <Link href="/movies" className="hover:underline">
                                Movies
                            </Link>
                        </li>
                        <li>
                            <button onClick={handleLogout} className="hover:underline">
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
