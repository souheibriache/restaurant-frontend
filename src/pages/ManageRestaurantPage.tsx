import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/managa-restaurant-form/ManageRestaurantForm";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: createRestaurantLoading } =
    useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  const { updateRestaurant, isLoading: updateRestaurantIsLoading } =
    useUpdateMyRestaurant();
  return (
    <ManageRestaurantForm
      onSave={restaurant ? updateRestaurant : createRestaurant}
      restaurant={restaurant}
      isLoading={createRestaurantLoading || updateRestaurantIsLoading}
    />
  );
};

export default ManageRestaurantPage;
