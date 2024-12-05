import { useState, useEffect } from "react";
import Header from "../components/Header";

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("Avengers"); // Default search query
    const [searchInput, setSearchInput] = useState(""); // For user input in the search bar
    const [watchlist, setWatchlist] = useState<{ imdbID: string; Title: string; Poster: string; Year: string }[]>([]);

    // Load watchlist from localStorage on component mount
    useEffect(() => {
        const savedWatchlist = localStorage.getItem("watchlist");
        if (savedWatchlist) {
            setWatchlist(JSON.parse(savedWatchlist));
        }
    }, []);

    // Fetch movies whenever search query changes
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const API_KEY = "ecd5acd7";
                const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}&type=movie`);

                if (!response.ok) {
                    throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();

                if (data.Response === "False") {
                    throw new Error(data.Error || "Unknown API error");
                }

                setMovies(data.Search || []);
            } catch (err: any) {
                console.error("Error fetching movies:", err.message);
                setError(`Failed to fetch movies: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [searchQuery]);

    // Handle search input
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearchQuery(searchInput);
    };

    // Add movie to the watchlist
    const addToWatchlist = (movie: { imdbID: string; Title: string; Poster: string; Year: string }) => {
        if (!watchlist.some((item) => item.imdbID === movie.imdbID)) {
            const updatedWatchlist = [...watchlist, movie];
            setWatchlist(updatedWatchlist);
            localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist)); 
        }
    };

    if (loading) {
        return <div className="p-4 text-center">Loading...</div>;
    }

    if (error) {
        return (
            <div className="p-4 text-center text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Search Movies</h2>
                {/* Search Bar */}
                <form onSubmit={handleSearch} className="mb-4">
                    <input
                        type="text"
                        placeholder="Search for a movie..."
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        className="border rounded p-2 w-full md:w-1/2"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2 md:mt-0 md:ml-2"
                    >
                        Search
                    </button>
                </form>
                {/* Movie List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {movies.map((movie: { imdbID: string; Title: string; Poster: string; Year: string }) => (
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
                            <button
                                onClick={() => addToWatchlist(movie)}
                                className="bg-green-500 text-white px-4 py-2 rounded mt-2 w-full"
                            >
                                Add to Watchlist
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MoviesPage;
