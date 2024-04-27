import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurantById = (restaurantId: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/${restaurantId}`
    );
    if (!response.ok) throw new Error("Faild getting Restaurant");
    return response.json();
  };
  const { data: restaurant, isLoading } = useQuery(
    "fetchRestaurantById",
    getRestaurantByIdRequest,
    { enabled: !!restaurantId }
  );
  return { restaurant, isLoading };
};

export const useGetRestaurants = (searchState: SearchState, city?: string) => {
  const getRestaurantsRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption);
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Faild to get restaurants");
    }

    return response.json();
  };

  const {
    data: results,
    error,
    isLoading,
  } = useQuery(["fetchRestaurants", searchState], getRestaurantsRequest, {
    enabled: !!city,
  });
  if (error) {
    toast.error("Failed to fetch restaurants");
  }

  return {
    results,
    isLoading,
  };
};
