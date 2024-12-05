import { useRouter } from "next/router";
import { useState } from "react";

const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = () => {
        // Validate that the username contains '@'
        if (username.includes("@") && password) {
            // Simulate storing the token (in reality, you'd handle this securely)
            localStorage.setItem("authToken", "yourTokenHere");
            router.push("/watchlist"); // Redirect to the watchlist page
        } else {
            setError("Invalid credentials. Please ensure your username contains '@'.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-md rounded w-96">
                <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm mb-1">
                        Username
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm mb-1">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default Login;
