import React from 'react';

const ruf = ({data}) => {
     return (
       
               <div
               key={data.id}
               className="book-common-style hover:bg-[#e5c0c0] transition-all duration-500 p-3 "
               data-aos="fade-right"
               onClick={() => handleDetails(data)}
             >
               {data ? (
                 <div className="w-[100px] h-[150px]">
                   {data?.formats ? (
                     <ReactImageFallback
                       className="avatar w-full h-full object-cover"
                       src={
                         data.formats["image/jpeg"] || data.formats["image/png"]
                       }
                       fallbackImage={`https:cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/${data.id}.jpg`}
                       initialImage="https:upload.wikimedia.org/wikipedia/commons/thumb/5/50/book_icon-cp.svg/1656px-book_icon-cp.svg.png"
                       alt="avatar"
                       loading="lazy"
                     />
                   ) : (
                     <Skeleton className="" />
                   )}
                   <div>
                     {/* Books is here */}

                     {data ? (
                       <div className="book-name">
                         <p className="  " style={{ fontWeight: "bolder" }}>
                           {data.authors && data.authors.length > 0
                             ? data.authors.map(author => author.name).join(", ")
                             : "Author Unknown"}
                         </p>
                         <p className="job-title">{data.title}</p>
                       </div>
                     ) : (
                       <Skeleton  />
                     )}
                   </div>
                 </div>
               ) : (
                 <Skeleton />
               )}
             </div>
  
         
     );
};

export default ruf;