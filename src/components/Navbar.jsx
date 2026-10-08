function Navbar({ user, onLogout }) {
 
    return (
        <nav className="navbar">
 
            <div>
                <h2>LavaLust Products</h2>
            </div>
 
            <div className="navbar-right">
 
                <span>
                    Welcome, <strong>{user.username}</strong>
                </span>
 
                <span className="role">
                    {user.role}
                </span>
 
                <button onClick={onLogout}>
                    Logout
                </button>
 
            </div>
 
        </nav>
    );
}
 
export default Navbar;