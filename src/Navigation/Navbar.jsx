import  { useState } from "react";
import logo from "/logo.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import useBookFilters from "../utilities/FakeDb";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    genres,
    search,
    filterData,
    handleSearchChange,
    handleGenreChange,
  } = useBookFilters();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-2 px-3 w-full bg-white shadow fixed top-0">
      {" "}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-6">
          <img className="h-8 rounded" src={logo} alt="Logo Image" />
          <p>Zepto Apps</p>
        </div>

        {/* Hamburger Menu */}
        <div
          className={`hamburger ${isOpen ? "toggle" : ""}`}
          onClick={toggleMenu}
        >
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>

        <ul
          className={`nav-links flex items-center gap-6 uppercase ${
            isOpen ? "open" : ""
          }`}
        >
          {/* Search Bar */}
          <input
            className="rounded p-1"
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={handleSearchChange}
          />

          {/* Dropdown for filter */}
          <select
            className="w-[130px] rounded p-1 text-black"
            onChange={handleGenreChange}
            value={filterData}
          >
            <option value="">All Genres</option>
            {genres.length > 0 ? (
              genres.map(genre => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))
            ) : (
              <option value="" disabled>
                No genres available
              </option>
            )}
          </select>

          {/* Navigation Links */}
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/bookList">Book List</Link>
          </li>
          <li>
            <Link to="/whiteList">White List</Link>
          </li>

          <li>
            <button className="login-button">Login</button>
          </li>
          <li>
            <button className="join-button text-[#fff] lg:text-black">
              Join
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
