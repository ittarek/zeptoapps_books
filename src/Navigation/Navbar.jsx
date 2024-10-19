import React, { useState } from "react";
import logo from "/logo.jpg";
import "./Navbar.css";
import Container from "../Components/Container";

const Navbar = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  genres,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-2 px-3 w-full bg-white shadow fixed top-0">
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
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />

          {/* Genre/Topic Dropdown */}
          <select className="w-[130px] rounded p-1 text-black"
            onChange={e => setSelectedGenre(e.target.value)}
            value={selectedGenre}
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

          <li>
            <a href="#" className="">
              Home
            </a>
          </li>
          <li>
            <a href="#">Books</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact Us</a>
          </li>
          <li>
            <button className="login-button">Login</button>
          </li>
          <li>
            <button className="join-button text-[#fff] lg:text-black">Join</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
