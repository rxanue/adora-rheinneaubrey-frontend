 
import { useState } from "react";
import Login from "./components/Login";
import Products from "./components/Products";
import Navbar from "./components/Navbar";
import "./App.css";
 
function App() {
    console.log(
        "API URL:",
        import.meta.env.VITE_API_URL
    );
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
 
    const [token, setToken] = useState(
        localStorage.getItem("access_token") || null
    );
 
    const handleLogin = (loginData) => {
        setUser(loginData.user);
        setToken(loginData.tokens.access_token);
 
        localStorage.setItem(
            "user",
            JSON.stringify(loginData.user)
        );
 
        localStorage.setItem(
            "access_token",
            loginData.tokens.access_token
        );
    };
 
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("access_token");
 
        setUser(null);
        setToken(null);
    };
 
    if (!user || !token) {
        return <Login onLogin={handleLogin} />;
    }
 
    return (
        <>
            <Navbar
                user={user}
                onLogout={handleLogout}
            />
 
            <Products
                user={user}
                token={token}
            />
        </>
    );
}
 
export default App;