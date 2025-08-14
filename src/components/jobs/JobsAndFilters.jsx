import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setFilter, resetFilters } from "../../redux/slices/jobsSlice";
import JobsSection from "../jobs/JobsSection";
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
            dispatch(
                setFilter({ name: "skill", value: [filterValue.toLowerCase()] }),
            );
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
            <div className="mx-auto bg-gray-50 pt-4 xs:w-11/12 lg:w-5/6 xl:w-4/5">
                <InputFilters />
            </div>

            {/* Jobs Section */}
            <div className="w-full bg-[#FAFAFA]">
                <div className="mx-auto flex xs:w-11/12 xs:flex-col lg:w-5/6 lg:flex-row xl:w-4/5">
                    {/* Job Cards */}
                    <div className="bg-[#FAFAFA] xs:w-full lg:w-3/5">
                        <JobsSection data={data} status={status} error={error} />
                    </div>

                    {/* Filters Section */}
                    <div className="mx-auto flex flex-col gap-y-4 bg-gray-50 xs:w-5/6 xs:pt-12 sm:w-full sm:flex-row sm:flex-wrap lg:w-1/3 lg:flex-col lg:pt-0">
                        <LocationsFilter filter="Jobs" />
                        {!isSkillFilter && <SkillsFilter filter="Jobs" />}
                        <TopRatedCarousel filter="Jobs" />
                    </div>
                </div >
            </div >
        </>
    );
}
