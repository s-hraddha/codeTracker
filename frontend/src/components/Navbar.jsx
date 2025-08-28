import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaLaptopCode } from "react-icons/fa6";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="p-4 bg-black text-white flex items-center justify-between">
      {/* Left Side - Logo */}
      <div className="flex items-center space-x-2">
        <FaLaptopCode className="text-3xl text-violet-900" />
        <Link to="/" className="text-lg font-medium cursor-pointer">
          CodeTracker
        </Link>
      </div>

      {/* Right Side - Auth Links */}
      <div className="flex items-center space-x-6">
        {user ? (
          <>
            <span className="font-medium">Welcome, {user.name}</span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:underline underline-offset-6 decoration-violet-900">
              Login
            </Link>
            <Link to="/register" className="hover:underline underline-offset-6 decoration-violet-900">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
