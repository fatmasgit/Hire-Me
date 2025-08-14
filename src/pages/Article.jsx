import React from "react";
import HeroBackGround from "../components/shared/HeroBackGround";
import { IoIosArrowForward } from "react-icons/io";
import articles from "../components/blog/articles";
import ArticleCard from "../components/blog/ArticleCard";
import { useParams } from "react-router-dom";
import usePageViewTracker from "../components/blog/PageViewsCustomHook";

export default function ArticlePage() {
  const pageViews = usePageViewTracker();
  const { id } = useParams();
  const article = articles.find((elm) => elm.id == id);
  //console.log(pageViews);

  return (
    <div className="bg-[#FAFAFA]">
      <HeroBackGround>
        <div className="flex h-full w-full flex-col items-center justify-center gap-y-3">
          <p className="font-PoppinsRegular text-white xs:text-[1.3rem] mobile:text-[1.4rem] md:text-[1.9rem] lg:text-[2.5rem]">
            64 Internships For Developers
          </p>
          <p className="flex items-center font-PoppinsRegular text-[1.1rem] text-white">
            {" "}
            Home <IoIosArrowForward className="xs:mx-2 md:mx-3" /> Blog
          </p>
        </div>
      </HeroBackGround>

      {/* jobs section */}
      <hr className="bg-[#FAFAFA] pt-5 text-transparent" />

      <div className="w-full bg-[#FAFAFA]">
        {/* screens */}
        <div className="mx-auto flex xs:w-[90%] xs:flex-col lg:w-[85%] lg:flex-row xl:w-[78%]">
          {/* job card */}
          <div className="bg-[#FAFAFA] xs:w-full lg:w-[63%]">
            <ArticleCard article={article} singleArticle={true} />
          </div>


        </div>
      </div>
    </div>
  );
}
