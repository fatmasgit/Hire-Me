import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import JobsCarouselCard from "./jobsCarouselCard";
import { fetchJobs } from '../../redux/slices/jobsSlice'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';



export default function JobsCarousel() {


  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.jobs);




  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);



  if (data?.length > 0) {
    // console.log('all jobs in the bellow line: ')
    //console.log(data)
  } else { return; }



  const settings = {
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    arrows: false,

    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],

  };

  return (

    <div className="w-full   bg-[#FAFAFA]  pb-5  " >
      <Slider {...settings} className="mx-auto  xs:w-11/12   sm:w-5/6    ">
        {data.slice(0, 10).map((job) => (
          <JobsCarouselCard key={job.id} job={job} />
        ))}
      </Slider>
    </div>

  );
}
