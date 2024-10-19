import React, { useState, useEffect } from "react";
import useBooks from "../../hook/useBooks";
import Skeleton from "react-loading-skeleton";
import Spinner from "../Spinner";
import loveIcon from "../../assets/love.svg";
import toast from "react-hot-toast";
import useAddBooks from "../../hook/useAddBooks";

const BookList = () => {
  const [books, loading] = useBooks();
 const [wishlist, toggleWishlist] = useAddBooks();


  if (loading) {
    return <Spinner />;
  }


  return (
    <div className="flex items-center justify-center w-full my-24">
      <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
        {books.map(data => (
          <div
            key={data.id}
            className="rounded-lg lg:w-[220px] max-w-sm h-[330px] overflow-hidden w-full cursor-pointer shadow-lg bg-slate-200 border border-slate-400 transition-all hover:-translate-y-0.5 relative"
          >
            {/* Image */}
            <div className="h-[150px] overflow-hidden">
              <img
                src={data.formats["image/jpeg"] || data.formats["image/png"]}
                alt="Card Image"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="p-3 flex justify-between flex-col">
              <div>
                <h2 className="text-lg font-bold leading-[1.4] mb-1">
                  {data.title}
                </h2>
                <div>
                  {data.title ? (
                    <p className="bio">{data.title}</p>
                  ) : (
                    <Skeleton />
                  )}
                </div>
              </div>
              <div className="mt-5 absolute bottom-0 mb-1 w-[190px] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <img
                    className="w-[20px] h-[20px] rounded-full"
                    src={
                      data.formats["image/jpeg"] || data.formats["image/png"]
                    }
                    alt="author"
                    loading="lazy"
                  />
                  {data.authors && data.authors.length > 0 ? (
                    <p>{data.authors.map(author => author.name).join(", ")}</p>
                  ) : (
                    <Skeleton />
                  )}
                </div>
                <button onClick={() => toggleWishlist(data)}>
                  {wishlist?.includes(data.id) ? "❤️" : "♡"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
