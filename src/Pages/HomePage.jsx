import JobsCarousel from "../components/Home/JobsCarousel";
import Header from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import HeroCards from "../components/Home/HeroCards";
import CampaniesCarousel from "../components/Home/companiesCarousel";


export default function Home() {
  return (
    <div className="w-full">
      <Header />
      <HeroCards />
      <JobsCarousel />
      <Categories />
      <CampaniesCarousel />

    </div>
  );
}
