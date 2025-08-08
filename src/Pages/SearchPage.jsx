import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchJobs,
} from "../redux/slices/jobsSlice";
import HeroSearch from "../components/Search/HeroSearch";
import JobsAndFilters from "../components/jobs/JobsAndFilters";

export default function SearchPage() {
  const dispatch = useDispatch();
  const { filters, data, status, error } = useSelector((state) => state.jobs);


  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, filters]);

  console.log("data...");
  console.log(filters);

  const displayedData = data;

  return (
    <div className="w-full bg-[#FAFAFA]">
      <HeroSearch />
      <JobsAndFilters data={displayedData} status={status} error={error} />
    </div>
  );
}
