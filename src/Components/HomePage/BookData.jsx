import "react-loading-skeleton/dist/skeleton.css";
import "./bookData.css";
import React, { Suspense, useState, startTransition } from "react";
import Spinner from "../Spinner";
import Container from "./../Container";
import bookIcon from "../../assets/bookIcon.svg";
import useBooks from "../../hook/useBooks";
import Skeleton from "react-loading-skeleton";
import ReactImageFallback from "react-image-fallback";
import rightArrow from "../../assets/right-arrow.svg";
import leftArrow from "../../assets/left-arrow.svg";
import loveIcon from "../../assets/love.svg";
import useAddBooks from "../../hook/useAddBooks";

const BookData = ({ currentPage, totalPages, setCurrentPage }) => {
  const [showDetails, setShowDetails] = useState({});
  const [wishlist, toggleWishlist] = useAddBooks();
  const [books, loading, refetch, error] = useBooks();

  const handleDetails = data => {
    startTransition(() => {
      setShowDetails(data);
    });
  };

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-red-500">{error.message}</div>;
  }

  return (
    <Container>
      <div className="book-container flex justify-between mt-[12%] lg:mt-[7%]">
        <div className="list-items lg:w-[50%]">
          {/* Pagination */}
          <div className="fixed top-0 lg:top-[85%] left-[35%] mx-auto mt-2 lg:mt-0 lg:mb-11 lg:px-5 lg:py-3 bg-[#C5DFFF] rounded-full w-[35%] flex justify-between items-center font-bold border border-[#000] z-10">
            <button
              className="cursor-pointer py-1 px-2 rounded-full active:bg-slate-200 flex items-center hover:text-green-700"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1 || totalPages <= 1}
              aria-label="Previous Page"
            >
              <img className="w-6 h-6" src={leftArrow} alt="left" />
              Previous
            </button>
            <span>{currentPage}</span>
            <button
              className="cursor-pointer py-1 px-2 rounded-full active:bg-slate-200 flex items-center hover:text-green-700"
              onClick={() =>
                setCurrentPage(prev => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages || totalPages <= 1}
              aria-label="Next Page"
            >
              Next
              <img className="w-6 h-6" src={rightArrow} alt="right" />
            </button>
          </div>

          {/* Books List */}
          <h2 className="lg:w-[500px] book-list text-center">All books</h2>
          {books.length === 0 ? (
            <p className="text-center text-gray-600">No books available.</p>
          ) : (
            books.map(data => (
              <div
                key={data.id}
                className="book-common-style lg:w-[500px] lg:flex h-[250px] lg:h-[190px] gap-6 mb-11 cursor-pointer lg:p-0 px-1 py-2 hover:bg-[#C5DFFF] transition-all focus:bg-[#C5DFFF] active:bg-[#C5DFFF] overflow-hidden w-full relative"
                onClick={() => handleDetails(data)}
              >
                {/* Book image */}
                <div className="h-[30%] lg:w-[200px] lg:h-auto flex-none text-center overflow-hidden">
                  <ReactImageFallback
                    className="w-full h-full object-cover hover:scale-110 duration-500"
                    src={
                      data.formats["image/jpeg"] || data.formats["image/png"]
                    }
                    fallbackImage={`https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${data.id}.jpg`}
                    initialImage="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/book_icon-cp.svg/1656px-book_icon-cp.svg.png"
                    alt={`Cover image of ${data.title}`}
                    loading="lazy"
                  />
                </div>

                <div className="px-1 flex flex-col justify-between leading-normal">
                  {/* Title */}
                  <div className="mt-2 mb-2">
                    <p className="text-sm text-gray-600 flex items-center">
                      <img className="w-4 h-4 mr-3" src={bookIcon} alt="" />
                      Book No: {data.id}
                    </p>
                    <p className="text-gray-900 font-bold lg:text-xl">
                      {data.title}
                    </p>
                  </div>
                  {/* Author */}
                  <div className="absolute bottom-0 mb-1 pr-1 flex lg:justify-between lg:w-[250px] gap-2 items-center">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-4 h-4 rounded-full"
                        src={
                          data.formats["image/jpeg"] ||
                          data.formats["image/png"]
                        }
                        alt="author"
                        loading="lazy"
                      />
                      <p className="text-xs lg:text-sm text-[#929292]">
                        {data.authors && data.authors.length > 0
                          ? data.authors.map(author => author.name).join(", ")
                          : "Author Unknown"}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleWishlist(data)}
                      className="text-2xl"
                      aria-label="Toggle Wishlist"
                    >
                      {wishlist.includes(data.id) ? "❤️" : "♡"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Book details card */}
        <div className="max-w-sm details_card overflow-hidden shadow-lg w-[50%] lg:w-[40%] border mr-11 fixed right-0 hover:bg-[#C5DFFF] duration-500 hover:scale-105">
          <h2 className="book-details-heading">Book Details</h2>
          <div className="data-details p-1 overflow-hidden px-6 py-4">
            {showDetails?.formats ? (
              <ReactImageFallback
                className="h-36 w-full object-contain"
                src={showDetails.formats["image/jpeg"]}
                fallbackImage={`https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${showDetails.id}.jpg`}
                initialImage="https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/book_icon-cp.svg/1656px-book_icon-cp.svg.png"
                alt={`Cover image of ${showDetails.title}`}
                loading="lazy"
              />
            ) : (
              <Skeleton className="avatar-skeleton" />
            )}
            <div className="font-bold text-xl my-2">
              {showDetails.title || <Skeleton width="80%" />}
            </div>
            {showDetails.subjects ? (
              <p className="text-gray-700 text-base">
                {Array.isArray(showDetails.subjects)
                  ? showDetails.subjects.slice(0, 5).join(", ")
                  : ""}
              </p>
            ) : (
              <Skeleton />
            )}
            <div className="mt-6">
              {showDetails.authors && showDetails.authors.length > 0 ? (
                <p>
                  {showDetails.authors.map(author => author.name).join(", ")}
                </p>
              ) : (
                <Skeleton />
              )}
              <div>
                {showDetails.title ? (
                  <p className="bio">{showDetails.title}</p>
                ) : (
                  <Skeleton />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default BookData;
