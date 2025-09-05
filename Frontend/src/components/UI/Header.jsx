import { NavLink, useNavigate } from "react-router-dom";
import { IoReorderThreeSharp } from "react-icons/io5";
import { useState } from "react";

export const Header = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleOnClick = () => setShow(!show);

  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#FFFDD0] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#1A1800]">
          <NavLink to="/">Me-API Playground</NavLink>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button
            onClick={handleOnClick}
            className="text-3xl text-[#1A1800]"
          >
            <IoReorderThreeSharp />
          </button>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6 text-[#1A1800] font-medium">
          <NavLink to="/" className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
            Home
          </NavLink>
          {/* <NavLink to="/about" className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
            About
          </NavLink> */}
          <NavLink to="/get-experience" className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
            Experience
          </NavLink>
          <NavLink to="/get-project" className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
            Project
          </NavLink>
          <NavLink to="/get-skill" className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
            Skill
          </NavLink>

          {/* Login / Logout Button */}
          <button
            onClick={isLoggedIn ? handleLogout : handleLogin}
            className="ml-4 bg-[#1A1800] hover:bg-[#3a2323] text-[#FFFDD0] px-4 py-2 rounded transition-colors"
          >
            {isLoggedIn ? "Logout" : "Login"}
          </button>
        </div>
      </div>

      {/* Mobile nav menu */}
      {show && (
        <ul className="md:hidden px-4 pb-4 space-y-2 text-[#1A1800] font-medium bg-[#FFFDD0]">
          <li>
            <NavLink to="/" onClick={() => setShow(false)} className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
              Home
            </NavLink>
          </li>
          {/* <li>
            <NavLink to="/about" onClick={() => setShow(false)} className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
              About
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/get-experience" onClick={() => setShow(false)} className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
              Experience
            </NavLink>
          </li>
          <li>
            <NavLink to="/get-project" onClick={() => setShow(false)} className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
              Project
            </NavLink>
          </li>
          <li>
            <NavLink to="/get-skill" onClick={() => setShow(false)} className={({ isActive }) => (isActive ? "underline font-semibold" : "")}>
              Skill
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                setShow(false);
                isLoggedIn ? handleLogout() : handleLogin();
              }}
              className="w-full text-left bg-[#1A1800] text-[#FFFDD0] px-3 py-2 rounded hover:bg-[#3a2323]"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};
