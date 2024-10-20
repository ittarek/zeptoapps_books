import React from 'react';
import { useLoaderData } from 'react-router-dom';
import "./BookDetails.css"
import authorImg from "../../assets/author.jpg"
import { FaEye } from "react-icons/fa";
import { LuShare2 } from "react-icons/lu";
import { FcStart } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa";
import { LiaImdb } from "react-icons/lia";
const BookDetails = () => {
  const data = useLoaderData();
  if (!data) {
    return <p>Book not found.</p>;
  }
  console.log(data);
  const { id, title, formats, subjects, download_count, authors, bookshelves } =
    data;

  return (
    <div className=" pl-9 my-24 bg-[#191a1a] border border-[#2F3031]">
      {/* image */}
      <div className="imgDiv  w-[90%] h-[400px] overflow-hidden mt-[40px] rounded-lg hover  duration-300 transition-all cursor-zoom-in">
        {/* book Image */}
        <img
          src={formats["image/jpeg"] || data.formats["image/png"]}
          alt="image"
          className="w-full h-full object-cover  "
        />
      </div>
      <div>
        {/* side navigation */}

        <div className="sideNavigation  w-[21%] top-16 lg:top-0 text-[#929292]  left-[80%] sticky lg:mt-[5%] ">
          <ul>
            <li>| Introduction</li>
            <li>| Book Overview</li>
            <li>| Book Journey</li>
            <li>| Content and Significance</li>
            <li>| Book Remastered Collection</li>
          </ul>
        </div>
        {/* main content */}
        <div className="lg:-mt-[12%] -mt-[65%]">
          {/* news details */}
          <div className="-ml-1  lg:w-[70%] relative">
            <h1 className="text-[#fff] text-4xl ">{title}</h1>
            {/* author and timing */}
            <div className="lg:flex justify-between items-end text-[#787B7B] font-semibold">
              {/* author  */}
              <div className="flex gap-3 items-center mt-4">
                {/* author image */}
                <img
                  src={authorImg}
                  className="w-[35px] h-[35px] rounded-full"
                  alt="authorImage"
                />{" "}
                <div>
                  <h3>
                    Created by
                    {authors && authors.length > 0
                      ? authors.map(author => author.name).join
                      : "Not found"}
                  </h3>

                  <span>2 min read</span>
                </div>
              </div>
              {/* timing */}
              <div className="newsTiming flex  items-center gap-3">
                <p>2 min ago</p>
                <p>
                  <FaEye />
                  20
                </p>
                <p>
                  <LuShare2 /> 213
                </p>
              </div>
            </div>

            <div
              className="mt-3 
            "
            >
              <p className='text-slate-300 text-xl w-[60%] lg:w-full'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste
                nam, quibusdam laborum quod quae quam quisquam veniam sapiente
                ullam. Necessitatibus suscipit aliquid ullam consequatur dolore,
                accusantium quaerat iste odio molestiae.
              </p>{" "}
           
            </div>

            {/* 4 div for extra single news */}
            <div className="extraDiv lg:flex justify-between items-center mt-11 mb-24">
              {/* div 1 */}
              <div className="tooltips">
                <h2 className="text-sm text-[#D4D4D3] ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </h2>
                <span className="flex gap-1 items-center text-[#787B7B]">
                  {" "}
                  {/* author image */}
                  <img
                    src={authorImg}
                    className="w-[20px] h-[20px] rounded-full "
                    alt=""
                  />{" "}
                  {authors && data.authors.length > 0 ? (
                    <p> {authors[0].name}</p>
                  ) : (
                    <p>No information </p>
                  )}
                </span>

                <span className="tooltipstext">
                  {" "}
                  <span className="authorSpan flex gap-1 items-center text-[#787B7B]">
                    {" "}
                    {/* /iamge */}
                    <img
                      src={authorImg}
                      className="w-[20px] h-[20px] rounded-full "
                      alt=""
                    />{" "}
                    {authors && data.authors.length > 0 ? (
                      <p> {authors[0].name}</p>
                    ) : (
                      <p>No information </p>
                    )}
                  </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem fugit nisi similique modi doloremque repellendus
                </span>
              </div>
              {/* div 2 */}
              <div className="tooltips">
                <h2 className="text-sm text-[#D4D4D3] ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil
                </h2>
                <span className="flex gap-1 items-center text-[#787B7B]">
                  {" "}
                  {/* author image */}
                  <img
                    src={authorImg}
                    className="w-[20px] h-[20px] rounded-full "
                    alt=""
                  />{" "}
                  {authors && data.authors.length > 0 ? (
                    <p> {authors[0].name}</p>
                  ) : (
                    <p>No information </p>
                  )}
                </span>
                <span className="tooltipstext">
                  {" "}
                  <span className="authorSpan flex gap-1 items-center text-[#787B7B]">
                    {" "}
                    {/* author image */}
                    <img
                      src=""
                      className="w-[20px] h-[20px] rounded-full "
                      alt=""
                    />{" "}
                    {authors && data.authors.length > 0 ? (
                      <p> {authors[0].name}</p>
                    ) : (
                      <p>No information </p>
                    )}
                  </span>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ipsam magni ipsum dolores? Expedita reprehenderit temporibus
                </span>
              </div>

              {/* div 3 */}
              <div className="tooltips">
                <h2 className="text-sm text-[#D4D4D3] ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
                </h2>
                <span className="flex gap-1 items-center text-[#787B7B]">
                  {" "}
                  {/* author image */}
                  <img
                    src={authorImg}
                    className="w-[20px] h-[20px] rounded-full "
                    alt=""
                  />{" "}
                  {authors && data.authors.length > 0 ? (
                    <p> {authors[0].name}</p>
                  ) : (
                    <p>No information </p>
                  )}
                </span>
                <span className="tooltipstext">
                  {" "}
                  <span className="authorSpan flex gap-1 items-center text-[#787B7B]">
                    {" "}
                    {/* author Image */}
                    <img
                      src={authorImg}
                      className="w-[20px] h-[20px] rounded-full "
                      alt=""
                    />{" "}
                    {authors && data.authors.length > 0 ? (
                      <p> {authors[0].name}</p>
                    ) : (
                      <p>No information </p>
                    )}
                  </span>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Saepe, blanditiis! Iure at veniam tenetur dicta, ea doloribus
                  nisi repudiandae vel? Cupiditate excepturi sint modi quas, rem
                  vel dolorum est veritatis? book details
                </span>
              </div>
              {/* div 4 */}

              <div className="sources_last_div flex gap-2 flex-col justify-between  my-auto">
                <div className="flex gap-2">
                  {" "}
                  <span>
                    <LiaImdb size={19} color="#000" />
                  </span>
                  <span>
                    {" "}
                    <FaDiscord size={19} color="#" />
                  </span>
                  <span>
                    <FcStart size={19} />
                  </span>
                </div>
                <p>View 3 more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;