import React, { useState, useEffect } from "react";
import logo from "/logo.jpg";
import "./Navbar.css";
import { Link } from "react-router-dom";
import useBooks from "../hook/useBooks";
import BookData from "../Components/HomePage/BookData";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const [books, loading, refetch, error] = useBooks();
  const [isOpen, setIsOpen] = useState(false);

  // Get unique genres for dropdown from books
  const genres = [...new Set(books.flatMap(book => book.subjects || []))];

  // Load search and genre preferences from localStorage when component mounts
  useEffect(() => {
    const storedSearchTerm = localStorage.getItem("searchTerm");
    const storedSelectedGenre = localStorage.getItem("selectedGenre");

    if (storedSearchTerm) {
      setSearchTerm(storedSearchTerm);
    }
    if (storedSelectedGenre) {
      setSelectedGenre(storedSelectedGenre);
    }
  }, []);

  // Toggle the hamburger menu for mobile view
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle search input change and store it in localStorage
  const handleSearchChange = e => {
    const value = e.target.value;
    setSearchTerm(value);
    localStorage.setItem("searchTerm", value); // Save search term to localStorage
  };

  // Handle genre filter change and store it in localStorage
  const handleGenreChange = e => {
    const value = e.target.value;
    setSelectedGenre(value);
    localStorage.setItem("selectedGenre", value); // Save selected genre to localStorage
  };

  // Filter books based on search term and selected genre
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "" || book.subjects?.includes(selectedGenre);

    return matchesSearch && matchesGenre;
  });

  // Pagination logic
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

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
            onChange={handleSearchChange}
          />

          {/* Genre Dropdown */}
          <select
            className="w-[130px] rounded p-1 text-black"
            onChange={handleGenreChange}
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

      {/* Hidden book list for pagination */}
      <div className="hidden">
        <BookData
          books={currentBooks}
          loading={loading}
          error={error}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </nav>
  );
};

export default Navbar;
