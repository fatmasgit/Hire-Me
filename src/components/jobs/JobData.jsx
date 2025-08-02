import React from "react";
import DOMPurify from "dompurify"; // to not to access real dom

function addListClasses(htmlString) {
  const updatedHtml = htmlString
    .replace(/<ul>/g, '<ul class="list-disc px-5">')  
    .replace(/<ol>/g, '<ol class="list-decimal px-5">');  
  return updatedHtml;
}

export default function JobData({ job }) {
  return (
    <div className="mt-4 flex w-full flex-col gap-y-4 leading-relaxed">
      {/* Job description */}
      <div className="w-full rounded-md bg-[#EAE8ED] p-4">
        {/* Heading */}
        <p className="mb-1 font-PoppinsSemiBold text-[1rem] text-[#444444] ">
          Job Description
        </p>
        {/* Job description text */}
        {job?.jobDescription ? (
          <div
            className="font-PoppinsRegular text-sm text-[#444444]  leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(addListClasses(job.jobDescription)),
            }}
          />
        ) : (
          <p className="font-PoppinsRegular text-sm text-[#444444]">
            No description available.
          </p>
        )}
      </div>

      {/* Job requirements */}
      <div className="w-full rounded-md bg-[#EAE8ED] p-4 leading-relaxed">
        {/* Heading */}
        <p className="mb-1 font-PoppinsSemiBold text-[1rem] text-[#444444]">
          Job Requirements
        </p>
        {job?.jobRequirements ? (
          typeof job.jobRequirements === "string" ? (
            <div
              className="font-PoppinsRegular text-sm text-[#444444]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(addListClasses(job.jobRequirements)),
              }}
            />
          ) : Array.isArray(job.jobRequirements) ? (
            <ul className="list-disc pl-5">
              {job.jobRequirements.map((requirement, index) => (
                <li
                  key={index}
                  className="font-PoppinsRegular text-sm text-[#444444] leading-relaxed"
                >
                  {requirement}
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-PoppinsRegular text-sm text-[#444444]">
              Invalid requirements format.
            </p>
          )
        ) : (
          <p className="font-PoppinsRegular text-sm text-[#444444]">
            No requirements provided.
          </p>
        )}
      </div>
    </div>
  );
}
