import SearchBar, { SearchForm } from "@/components/SearchBar";
import appDownload from "../assets/appDownload.png";
import landing from "../assets/landing.png";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const navigate = useNavigate();
  const handleSearchSubmit = (searchFormValues?: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues?.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-orange-600">
          Tuck into a takeway today
        </h1>
        <span className="text-xl">Food is just a click away</span>
        <SearchBar
          onSubmit={handleSearchSubmit}
          placeHolder="Search by City or Town"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landing} className="" />
        <div className="flex flex-col justify-center items-center gap-4 text-center">
          <span className="text-3xl font-bold tracking-tighter">
            Order Takeway even faster!
          </span>
          <p>
            Download the MernEats app for faster ordering and presonalized
            recommendations
          </p>
          <img src={appDownload} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
