import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useAddBooks = () => {
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage when hook initializes
  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  }, []);

  // Function to add or remove a book from the wishlist
  const toggleWishlist = book => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let updatedWishlist;
    if (storedWishlist.includes(book.id)) {
      // Remove the book if it's already in the wishlist
      updatedWishlist = storedWishlist.filter(id => id !== book.id);
      toast.error("Removed book from wishlist.");
    } else {
      // Add the book if it's not in the wishlist
      updatedWishlist = [...storedWishlist, book.id];
      toast.success("Added book to wishlist.");
    }

    // Update the state and localStorage
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return [wishlist, toggleWishlist];
};

export default useAddBooks;
