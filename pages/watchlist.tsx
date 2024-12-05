import { useState, useEffect } from "react";
import Header from "../components/Header";

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState<{ imdbID: string; Title: string; Poster: string; Year: string }[]>([]);

    useEffect(() => {
        const savedWatchlist = localStorage.getItem("watchlist");
        if (savedWatchlist) {
            setWatchlist(JSON.parse(savedWatchlist));
        }
    }, []);

    return (
        <div>
            <Header />
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
                {watchlist.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {watchlist.map((movie) => (
                            <div key={movie.imdbID} className="border rounded shadow p-4">
                                <img
                                    src={
                                        movie.Poster !== "N/A"
                                            ? movie.Poster
                                            : "/placeholder.jpg"
                                    }
                                    alt={movie.Title}
                                    className="w-full h-auto rounded"
                                />
                                <h3 className="text-lg font-semibold mt-2">{movie.Title}</h3>
                                <p className="text-gray-600">Year: {movie.Year}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">Your watchlist is empty. Add some movies!</p>
                )}
            </div>
        </div>
    );
};

export default WatchlistPage;
