import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCube, Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import TopRatedJobs from "./TopRatedJobs";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllJobs } from "../../redux/slices/jobsSlice";

const TopRatedCarousel = ({ filter }) => {
  const { i18n } = useTranslation();
  const direction = i18n.dir(i18n.language);
  const dispatch = useDispatch();
  const { allJobs, status, error } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchAllJobs());
  }, [dispatch]);



  // getting a jobs of different cities
  const distinctCities = allJobs.reduce((acc, item) => {
    if (acc.length >= 4) return acc;
    if (!acc.some((city) => city.jobLocation.city === item.jobLocation.city)) {
      acc.push(item);
    }
    return acc;
  }, []);






  return (
    <div className="w-full " dir={direction}>
      <Swiper
        key={distinctCities.length} // ensures re-init when allJobs changes
        dir={direction}
        effect="cube"
        modules={[EffectCube, Autoplay, Pagination]}
        grabCursor={true}
        loop={true}
        slidesPerView={1}
        spaceBetween={0}
        cubeEffect={{
          shadow: false,
          slideShadows: false,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}


        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        className="mySwiper   rounded-lg xs:w-full sm:w-[70%] md:w-[60%]
       lg:w-full "
      >
        {distinctCities.map((elm, i) => (
          <SwiperSlide key={i}>
            <TopRatedJobs filter={filter} job={elm} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TopRatedCarousel;
