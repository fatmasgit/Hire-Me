import React from "react";
import articles from "./articles";
import ArticleCard from "./articleCard";
import { Link } from "react-router-dom";

export default function BlogData() {
  return (
    <div className="flex w-full flex-col gap-y-5">
      {articles.map((elm, i) => (
        <Link
          to={`/Article/${elm.id}`}
          className="transform rounded-lg bg-[#FAFAFA] px-1 !no-underline duration-300 ease-in hover:scale-105 hover:bg-[#FAFAFA]"
        >
          <ArticleCard article={elm} key={i} />
        </Link>
      ))}
    </div>
  );
}
