import { useState, useEffect, useMemo } from "react";
import useBooks from "../hook/useBooks";

const useBookFilters = (booksPerPage = 10) => {
  const [books, loading, refetch, error] = useBooks();
  const [finalData, setFinalData] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState('' );
  const [currentPage, setCurrentPage] = useState(1);

  // Extract genres from books
  const genres = useMemo(
    () => [...new Set(books.flatMap(book => book.subjects || []))],
    [books]
  );

  //  search and genre from localStorage
useEffect(() => {
  localStorage.setItem("search", search);
}, [search]);

useEffect(() => {
  localStorage.setItem("filterData", filterData);
}, [filterData]);



  // Filter books by search
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      const matchesSearch = book.title
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesGenre = filterData
        ? book.subjects?.includes(filterData)
        : true;
      return matchesSearch && matchesGenre;
    });
  }, [books, search, filterData]);

  // Total pages calculation
  const totalPages = useMemo(() => {
    return Math.ceil(filteredBooks.length / booksPerPage);
  }, [filteredBooks, booksPerPage]);

  useEffect(() => {
    setWaiting(true);
    const paginatedBooks = filteredBooks.slice(
      (currentPage - 1) * booksPerPage,
      currentPage * booksPerPage
    );
    setFinalData(paginatedBooks);
    setWaiting(false);
  }, [filteredBooks,currentPage, booksPerPage]); 
  const handleSearchChange = e => {
    const value = e.target.value;
    setSearch(value);
    localStorage.setItem("search", value);
  };

  const handleGenreChange = e => {
    const value = e.target.value;
    if (value !== filterData) {
      setFilterData(value);
    }
  };

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  return {
    genres,
    search,
    filterData,
    currentPage,
    finalData,
    totalPages,
    // waiting,
    error,
    loading,
    filteredBooks,
    handleSearchChange,
    handleGenreChange,
    handlePageChange,
    setSearch,
    setFilterData,
  };
};

export default useBookFilters;
