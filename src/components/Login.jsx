import { useState } from "react";
 
function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const API_URL = import.meta.env.VITE_API_URL;
 
    const handleSubmit = async (e) => {
        e.preventDefault();
 
        setError("");
        setLoading(true);
 
        try {
            const response = await fetch(
                `${API_URL}/api/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password
                    })
                }
            );
 
            const data = await response.json();
 
            if (!response.ok) {
                throw new Error(
                    data.error || "Login failed."
                );
            }
 
            onLogin(data);
 
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };
 
    return (
        <div className="login-container">
 
            <div className="login-card">
 
                <h1>LavaLust</h1>
 
                <h2>Login</h2>
 
                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}
 
                <form onSubmit={handleSubmit}>
 
                    <div className="form-group">
                        <label>Username</label>
 
                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Enter username"
                            required
                        />
                    </div>
 
                    <div className="form-group">
                        <label>Password</label>
 
                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="Enter password"
                            required
                        />
                    </div>
 
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
 
                </form>
 
            </div>
 
        </div>
    );
}
 
export default Login;