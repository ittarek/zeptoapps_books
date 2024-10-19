import BookData from "./Components/HomePage/BookData";
import "./App.css";
import Navbar from "./Navigation/Navbar";
import { useState } from "react";
import useBooks from "./hook/useBooks";
// const Skeleton = React.lazy(() => import("react-loading-skeleton"));
const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;

  const [books, loading, refetch, error] = useBooks();

  const genres = [...new Set(books.flatMap(book => book.subjects || []))]; // Use subjects instead of genres

  console.log(genres);

  // Filter books based on search and subject (genre)
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre
      ? book.subjects?.includes(selectedGenre)
      : true;
    return matchesSearch && matchesGenre;
  });
  // Slice the books array to get only the books for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="App">
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        genres={genres}
      />
      <BookData
        books={currentBooks} // Pass the sliced array of books
        loading={loading}
        error={error}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};


export default App;
