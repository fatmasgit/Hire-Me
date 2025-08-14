import React, { useState, useEffect } from "react";
import JobCard from "./JobCard";
import { Pagination, Box } from '@mui/material';
import { useTranslation } from "react-i18next";
import CircularLoader from '../shared/Loading'
export default function JobsSection({ data, status, error }) {
  const { i18n } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  useEffect(() => {
    setCurrentPage(1);
  }, [data]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const isRtl = i18n.dir(i18n.language) === 'rtl';
  // console.log(data)
  return (
    <div className="flex flex-col gap-y-[1.6rem] items-center">
      {status === "loading" && <CircularLoader />}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <>
          {data?.slice(startIndex, endIndex).map((elm, i) => (
            <JobCard job={elm} key={i} />
          ))}
          {data.length > itemsPerPage && (
            <Box
              sx={{
                direction: isRtl ? 'rtl' : 'ltr', // Set direction based on current language
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Pagination
                count={Math.ceil(data.length / itemsPerPage)}
                page={currentPage}
                onChange={handlePageChange}
                shape="rounded"
                sx={{
                  '& .MuiPaginationItem-previousNext': {
                    transform: isRtl ? 'rotate(180deg)' : 'none', // Rotate arrows for RTL
                  }
                }}
              />
            </Box>
          )}
        </>
      )}
    </div>
  );
}
