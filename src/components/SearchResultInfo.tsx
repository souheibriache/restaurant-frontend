import { Link } from "react-router-dom";

type Props = {
  total: number;
  city: string;
};

const SearchResultInfo = ({ total, city }: Props) => {
  return (
    <div className="text-xl flex flex-col gap-3 justify-between lg:items-center lg:flex-row">
      <span className=" flex gap-2 items-baseline">
        {total} Restaurants found in {city}
        <Link
          to="/"
          className="text-sm font-semibold cursor-pointer text-blue-500"
        >
          Change location
        </Link>
      </span>
    </div>
  );
};

export default SearchResultInfo;
