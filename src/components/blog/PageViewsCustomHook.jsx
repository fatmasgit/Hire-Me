import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePageViewTracker = () => {
  const location = useLocation(); // Get the current route location
  const [pageViews, setPageViews] = useState(
    () => JSON.parse(localStorage.getItem("pageViews")) || {},
  );

  useEffect(() => {
    const page = location.pathname; // Current page path
    const updatedPageViews = { ...pageViews };

    // Increment the view count for the current page
    updatedPageViews[page] = (updatedPageViews[page] || 0) + 1;

    // Update state and save back to localStorage
    setPageViews(updatedPageViews);
    localStorage.setItem("pageViews", JSON.stringify(updatedPageViews));

    //  console.log(`Page: ${page}, Total Views: ${updatedPageViews[page]}`);
  }, [location]);

  // Return the page views object
  return pageViews;
};

export default usePageViewTracker;
