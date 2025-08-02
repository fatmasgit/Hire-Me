import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanies, setCurrentPage } from '../../redux/slices/companiesSlice';
import { LiaArrowCircleLeftSolid } from "react-icons/lia";
import CompanyCard from './CompanyCard';
import JobCard from '../jobs/JobCard';
import Pagination from '@mui/material/Pagination';

const CompaniesSection = () => {
  const dispatch = useDispatch();

  const [showRelatedJobs, setShowRelatedJobs] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [jobsCurrentPage, setJobsCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const {
    companies,
    loadingCompanies,
    error,
    companiesWithJobs,
    currentPage: companiesCurrentPage,
  } = useSelector((state) => state.companies);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);


  const handleShowRelatedJobs = (name) => {
    setCompanyName(name);
    setShowRelatedJobs(true);
    setJobsCurrentPage(1);
  };


  const handleGoBack = () => {
    setShowRelatedJobs(false);
    setCompanyName('');
  };


  const handleCompaniesPageChange = (event, value) => {
    dispatch(setCurrentPage(value));
  };


  const handleJobsPageChange = (event, value) => {
    setJobsCurrentPage(value);
  };

  if (loadingCompanies) return <div>Loading companies...</div>;
  if (error) return <div>Error: {error}</div>;


  const currentPage = companiesCurrentPage || 1;


  const companiesStartIndex = (currentPage - 1) * itemsPerPage;
  const companiesEndIndex = companiesStartIndex + itemsPerPage;

  const jobsStartIndex = (jobsCurrentPage - 1) * itemsPerPage;
  const jobsEndIndex = jobsStartIndex + itemsPerPage;



  return (
    <>
      {!showRelatedJobs && (
        <div className="flex flex-col gap-y-[1.6rem] items-center">
          {companies?.slice(companiesStartIndex, companiesEndIndex).map((company) => (
            <CompanyCard
              company={company}
              key={company.id}
              handleShowRelatedJobs={() => handleShowRelatedJobs(company.name)}
            />
          ))}
          {companies.length > itemsPerPage && (
            <Pagination
              count={Math.ceil(companies.length / itemsPerPage)}
              page={currentPage}
              onChange={handleCompaniesPageChange}
              shape="rounded"
            />
          )}
        </div>
      )}

      {showRelatedJobs && (
        <div>
          <button onClick={handleGoBack} className="py-2 mb-4">
            <LiaArrowCircleLeftSolid
              className="scale-75 md:scale-100"
              color="#3B235D"
              size={35}
            />
          </button>

          <div className="flex flex-col gap-y-[1.6rem] items-center">
            {companiesWithJobs[companyName]
              ?.slice(jobsStartIndex, jobsEndIndex)
              .map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            {companiesWithJobs[companyName]?.length > itemsPerPage && (
              <Pagination
                count={Math.ceil(companiesWithJobs[companyName]?.length / itemsPerPage)}
                page={jobsCurrentPage}
                onChange={handleJobsPageChange}
                shape="rounded"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CompaniesSection;
