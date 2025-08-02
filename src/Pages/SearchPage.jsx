import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, clearSearchData, setJobsPerCompany, setFiltersFromOutside } from "../redux/slices/jobsSlice";
import HeroSearch from "../components/Search/HeroSearch";
import JobsAndFilters from "../components/jobs/JobsAndFilters";


export default function SearchPage() {
  const dispatch = useDispatch();
  const { filters, data, status, error } = useSelector((state) => state.jobs);


  // UseEffect to fetch jobs if no formData is present
  useEffect(() => {
    dispatch(fetchJobs()); // Fetch jobs if no formData
  }, [dispatch, filters]);

  console.log('data...')
  console.log(filters)
  // Data to display
  const displayedData = data; // Prioritize formData over filtered data




  return (


    <div className="w-full bg-[#FAFAFA]">
      <HeroSearch />
      <JobsAndFilters data={displayedData} status={status} error={error} />
    </div>



  );
}
