import { useGetRestaurants } from "@/api/RestaurantApi";
import CuisineFilter from "@/components/CuisineFilter";
import PaginationSelector from "@/components/PaginationSelector";
import SearchBar, { SearchForm } from "@/components/SearchBar";
import SearchResultInfo from "@/components/SearchResultInfo";
import SearchResultsCard from "@/components/SearchResultsCard";
import SortOptionDropdown from "@/components/SortOptionDropdown";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type SearchState = {
  searchQuery: string;
  page: number;
  selectedCuisines: string[];
  sortOption: string;
};
const SearchPage = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    searchQuery: "",
    page: 1,
    selectedCuisines: [],
    sortOption: "bestMatch",
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const { city } = useParams();
  const { results, isLoading } = useGetRestaurants(searchState, city);

  const setSortOption = (sortOption: string) => {
    setSearchState((previousState) => ({
      ...previousState,
      sortOption,
      page: 1,
    }));
  };

  const setPage = (page: number) => {
    setSearchState((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const setSelectedCuisines = (selectedCuisines: string[]) => {
    setSearchState((prevState) => ({
      ...prevState,
      selectedCuisines,
    }));
  };

  const setSearchQuery = (searchFormData: SearchForm) => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: searchFormData.searchQuery,
    }));
  };

  const resetSearchQuery = () => {
    setSearchState((previousState) => ({
      ...previousState,
      searchQuery: "",
      page: 1,
    }));
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (!results?.data || !city) {
    return <span>No results found</span>;
  }
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div id="cuisines-list">
        <CuisineFilter
          isExpanded={isExpanded}
          onChange={setSelectedCuisines}
          onExpandedClick={handleExpand}
          selectedCuisines={searchState.selectedCuisines}
        />
      </div>
      <div id="main-content" className="flex flex-col gap5">
        <SearchBar
          searchQuery={searchState.searchQuery}
          onSubmit={setSearchQuery}
          placeHolder="Search by cuisine or restaurant name"
          onReset={resetSearchQuery}
        />
        <div className="flex justify-between flex-col gap-3 mt-5 lg:flex-row">
          <SearchResultInfo total={results.pagination.total} city={city} />
          <SortOptionDropdown
            onChange={setSortOption}
            sortOption={searchState.sortOption}
          />
        </div>

        {results.data.map((restaurant) => {
          return <SearchResultsCard restaurant={restaurant} />;
        })}
        <PaginationSelector
          page={results.pagination.page}
          pages={results.pagination.pages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default SearchPage;
