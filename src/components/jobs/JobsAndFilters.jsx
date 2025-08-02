import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
    clearSearchData,
    setFilter,
    resetFilters,
    setJobsPerCompany,
} from "../../redux/slices/jobsSlice";

import JobsSection from "../jobs/jobsSection";
import InputFilters from "../jobs/InputFilters";
import SkillsFilter from "../jobs/SkillsFillter";
import LocationsFilter from "../jobs/LocationsFilter";
import TopRatedCarousel from "../jobs/TopRatedJobsCrousel";
import { useEffect } from "react";

export default function JobsAndFilters({ data, status, error }) {
    const dispatch = useDispatch();

    const { filterType, filterValue } = useParams();
    const isSkillFilter = filterType === "skill" && filterValue;

    // Set skill filter if skill param exists
    useEffect(() => {
        if (isSkillFilter) {
            dispatch(setFilter({ name: "skill", value: [filterValue.toLowerCase()] }));
        }
    }, [isSkillFilter, filterValue, dispatch]);


    // ✅ Reset filters when component unmounts (user navigates away)
    useEffect(() => {
        return () => {
            dispatch(resetFilters());
        };
    }, [dispatch]);

    return (
        <>
            {/* Filters */}
            <div className="mx-auto bg-[#FAFAFA] pt-4 xs:w-[90%] lg:w-[85%] xl:w-[78%]">
                <InputFilters />
            </div>

            {/* Jobs Section */}
            <div className="w-full bg-[#FAFAFA]">
                <div className="mx-auto flex xs:w-[90%] xs:flex-col lg:w-[85%] lg:flex-row xl:w-[78%]">
                    {/* Job Cards */}
                    <div className="bg-[#FAFAFA] xs:w-full lg:w-[63%]">
                        <JobsSection data={data} status={status} error={error} />
                    </div>

                    {/* Filters Section */}
                    <div className="mx-auto flex flex-col gap-y-4 bg-[#FAFAFA] 
                        xs:w-[85%] lg:w-[33%] sm:w-full sm:flex-row sm:flex-wrap 
                        xs:pt-[3rem] lg:flex-col lg:pt-0"
                    >
                        <LocationsFilter filter="Jobs" />
                        {!isSkillFilter && (
                            <SkillsFilter filter="Jobs" />
                        )}
                        <TopRatedCarousel filter="Jobs" />
                    </div>
                </div>
            </div>
        </>
    );
}
