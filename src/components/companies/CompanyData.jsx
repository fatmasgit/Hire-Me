import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCompanyById, fetchCompanyJobs } from "../../redux/slices/companiesSlice";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn, } from "react-icons/fa";
import { LiaArrowCircleDownSolid, LiaArrowCircleUpSolid } from "react-icons/lia";
import { GoMail } from "react-icons/go";
import { SlPhone } from "react-icons/sl";
import { GrUserWorker, GrLocation } from "react-icons/gr";
import { TfiWorld } from "react-icons/tfi";
import { TbCirclesRelation } from "react-icons/tb";
import { useState } from "react";
import JobCard from '../jobs/JobCard';



export default function CompanyData() {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const [showRelatedJobs, setShowRelatedJobs] = useState(false);
  const { singleCompany, loadingSingleCompany, singleCompanyError } = useSelector(
    (state) => state.companies
  );

  // fetch by id params
  const CompanyId = id;
  const CompanyName = name.replace(/_/g, " ");



  useEffect(() => {
    if (CompanyId) {
      dispatch(fetchCompanyById(CompanyId));
    }
  }, [dispatch, CompanyId]);



  useEffect(() => {
    if (singleCompany?.name) {
      dispatch(fetchCompanyJobs(singleCompany.name));
    }
  }, [dispatch, singleCompany?.name]);
  const { companiesWithJobs } = useSelector((state) => state.companies);



  const handleFetchRelatedJobs = () => {
    setShowRelatedJobs((prevState) => !prevState);
  };


  return (
    <div>
      {loadingSingleCompany && <p>Loading company data...</p>}
      {singleCompanyError && <p>Error: {singleCompanyError}</p>}

      <div className="flex w-full flex-col gap-y-1 ">
        <img
          src={singleCompany?.image}  className="h-[20rem] w-full object-cover xs:rounded-md md:rounded-xl"
        />

        <p className="mt-3 font-PoppinsMedium text-2xl text-[#3B235D]  my-1">{singleCompany?.name}</p>
        <div className="my-1.5 flex gap-x-2">
          <GrUserWorker size={22} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-[0.9rem] md:text-[1rem]">
            {" "}
            {singleCompany?.industry}{" "}
          </p>
        </div>


        <div className="my-1.5 flex gap-x-2">
          <GrLocation size={22} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-[0.9rem] md:text-[1rem]">
            {" "}
            {singleCompany?.country} , {singleCompany?.city} {" "}
          </p>
        </div>

        <div className="my-1.5 flex gap-x-2">
          <TfiWorld size={22} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-[0.9rem] md:text-[1rem]">
            {" "}
            {singleCompany?.website}{" "}
          </p>
        </div>

        <div className="my-1.5 flex gap-x-2">
          <GoMail size={22} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-[0.9rem] md:text-[1rem]">
            {" "}
            {singleCompany?.email}{" "}
          </p>
        </div>

        <div className="my-1.5 flex gap-x-2">
          < SlPhone size={22} />
          <p className="font-PoppinsRegular text-[#444444] xs:text-[0.9rem] md:text-[1rem]">
            {" "}
            {singleCompany?.phone}{" "}
          </p>
        </div>




        {/* view related jobs */}
        <div className="my-1 flex gap-x-2   cursor-pointer items-center " onClick={handleFetchRelatedJobs}  >
          <TbCirclesRelation size={23} color='#3B235D' />
          <p
            className="text-balance font-PoppinsMedium  text-[#3B235D] xs:text-sm  md:text-base cursor-pointer">
            View related jobs
            ( {companiesWithJobs[singleCompany?.name]?.length || 0} )
          </p>

          {showRelatedJobs ?
            <LiaArrowCircleUpSolid color='#3B235D' className="scale-75 -translate-x-2  md:-translate-x-1  md:scale-100" size={25} />
            : <LiaArrowCircleDownSolid color='#3B235D' className="scale-75 -translate-x-2  md:-translate-x-1  md:scale-100" size={25} />
          }

        </div>


        {/*the related jobs div */}
        {showRelatedJobs && (
          <div className="my-3 flex flex-col gap-y-[1.6rem]" >
            {companiesWithJobs[singleCompany?.name]?.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}



        {/* company summary start */}
        <div className="my-3 w-full rounded-md bg-[#EAE8ED] p-4 leading-relaxed">
          {/*heading */}{" "}
          <p className="mb-1 font-PoppinsSemiBold text-[1rem] text-[#444444]">
            Company overview:
          </p>
          <p className="mb-3 font-PoppinsRegular text-[0.9rem] text-[#444444]">
            {" "}
            We love to make it happen with you!
          </p>
          <p className="mb-3 font-PoppinsRegular text-[0.9rem] text-[#444444]">
            <span className="font-PoppinsMedium">
            { singleCompany?.name + ' ' } 
            </span>
             is reinventing the way businesses and governments work, stay and
            pay in today’s dynamic global marketplace. {singleCompany?.name}’ advanced platform
            technology is extending its reach beyond hospitality to meetings,
            office space management, payment efficiency and crisis recovery.
            Beyond cost savings in the global post-pandemic economy, {singleCompany?.name} clients
            gain from an unrivaled focus on essential aspects including safety,
            security and satisfaction. {singleCompany?.name} is also recognized for its
            award-winning Green Stay Initiative, technology that helps corporate
            hotel programs achieve their NetZero targets, and its groundbreaking
            Crew & Passengers Solution, which leverages automation to elevate
            experiences for air and rail operations.
          </p>
          <p className="mb-4 font-PoppinsRegular text-[0.9rem] text-[#444444]">
            Founded in 1972, {singleCompany?.name} works with 35 percent of the global Fortune 500,
            as well as the world’s leading hotel chains, regional hospitality
            groups and payment providers. More information at
            <span className="font-PoppinsMedium text-[#3B235D]">
              {" "}
              {singleCompany?.website || 'https://www.xyz.com/enterprise/' }
            </span>
          </p>
          {/*heading */}{" "}
          <p className="mb-1 font-PoppinsSemiBold text-[1rem] text-[#444444]">
            {" "}
            Why will you love the work there ?{" "}
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Attractive salary package and valuable benefits
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Get the opportunity to access global L&D programs
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • International and innovative working environment
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Your voice is listened to, and your skill development is supported
            constantly.
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Working with colleagues and experts at other offices such as
            Germany, Australia, Poland, Ukraine...
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Salary is very attractive and competitive.
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Rewarding outstanding contribution by the project bonus, quarterly
            bonus, and yearly bonus.
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Supportive working conditions: laptop, MS Surface Hub, nice office,
            pure pantry with coffee, soft drink, snacks...
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Fully compliant with Vietnam Labor Code, especially the insurance is
            based on full salary.
          </p>
          <p className="font-PoppinsRegular text-[0.9rem] text-[#444444]">
            • Additional standard benefits: additional health insurance, company
            trip and business travel, training, year-end party, team outing
            activities.
          </p>
        </div>


        <div className="my-2 flex -translate-x-1 justify-start text-[#3B235D] xs:space-x-3 md:space-x-5">
          <FaFacebookF className="h-5 w-5" />
          <FaInstagram className="h-5 w-5" />
          <FaTwitter className="h-5 w-5" />
          <FaLinkedinIn className="h-5 w-5" />
        </div>
      </div>




    </div>
  );
}
