import React from "react";
import { AiOutlineEye } from "react-icons/ai";
import { useParams } from "react-router-dom";


export default function ArticleCard({ article, singleArticle = false }) {

  const pageViews = JSON.parse(localStorage.getItem("pageViews")) || {}; // Retrieve the object
  const matchingKey = Object.keys(pageViews).find(
    (key) => key === `/Article/${article.id}`,
  );
  const value = matchingKey ? pageViews[matchingKey] : undefined;
  // console.log(value)

  return (
    <div className="flex w-full flex-col gap-y-2 bg-[#FAFAFA] pb-5">
      {/*the img div */}
      {/*   <div className='h-[16rem] overflow-hidden  md:rounded-xl  bg-transparent'> */}
      <img
        src={article.img}
        className="aspect-video w-full object-cover xs:rounded-md"
      />

      {/*the img div */}

      <div className="flex items-center gap-x-2 pr-1 text-[#444444] xs:flex-col md:flex-row">
        <img src={article.authImg} />
        <p className="text-center font-PoppinsMedium text-text-sm md:truncate">
          Content Writer: <span>{article.author} </span> • {article.date}
        </p>
      </div>

      <div className="mx-3 mb-1 flex items-center justify-center space-x-1">
        <AiOutlineEye className="text-gray-600" size={24} />
        <span className="font-PoppinsRegular text-[1rem] text-gray-600">
          {value}
        </span>
      </div>
      {/* article heading */}
      <p className="font-PoppinsSemiBold text-[1.3rem] text-[#3B235D]">
        {article.title}
      </p>

      <p
        className={`${singleArticle ? "" : "line-clamp-4"} font-PoppinsRegular leading-relaxed text-[#444444]`}
      >
        {article.summary
          .replace(/([^\w\s])?\?([^\w\s\.]*)/g, (match) => `${match}<br />`) // Capture punctuation around `?`
          .replace(/(?<=\s)(\.\s)(?=\s|$)/g, ".<br /><br />") // Add two line breaks after a single dot if surrounded by whitespace
          .split("<br />") // Split the string at each `<br />`
          .map((part, index, array) => (
            <>
              {part}
              {index !== array.length - 1 && <br />}
            </>
          ))}
      </p>
    </div>
  );
}
