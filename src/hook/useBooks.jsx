import { useQuery } from "@tanstack/react-query";
import { useTransition } from "react";

const useBooks = () => {
  const {
    data: books = [],
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await fetch("https://gutendex.com/books");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data.results || [];
    },
    onError: error => {
      console.error("Error fetching books:", error);
    },
  });

  return [books, loading, refetch, error]; // এখানে error যুক্ত করা হয়েছে
};

export default useBooks;
