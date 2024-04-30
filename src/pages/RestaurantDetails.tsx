import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurantById } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-forms/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const RestaurantDetails = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurantById(restaurantId || "");
  const { createCheckoutSession, isLoading: isCreateCheckoutSessionLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((previous) => {
      const itemExists: CartItem | undefined = cartItems.find(
        (item) => item._id === menuItem._id
      );
      let updatedCartItems;
      if (itemExists) {
        updatedCartItems = previous.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        const newCartItem = { ...menuItem, quantity: 1 };
        updatedCartItems = [...cartItems, newCartItem];
      }

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((previous) => {
      let newCartItems;
      if (cartItem.quantity === 1)
        newCartItems = previous.filter(
          (element) => element._id !== cartItem._id
        );
      else
        newCartItems = previous.map((element) =>
          element._id === cartItem._id
            ? { ...element, quantity: element.quantity - 1 }
            : element
        );

      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(newCartItems)
      );

      return newCartItems;
    });
  };
  if (isLoading || !restaurant) return <div>Loading...</div>;

  const onCheckout = async (userFormData: UserFormData) => {
    console.log({ userFormData });

    if (!restaurant) return;

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    window.location.href = data.url;
  };

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="z-0 h-full w-full rounded-md object-cover"
          src={restaurant.imageUrl}
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 pd:px-32 ">
        <div className="flex flex-col gap-4 ">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem addToCart={() => addToCart(menuItem)} {...menuItem} />
          ))}
        </div>
        <div>
          <Card>
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCreateCheckoutSessionLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
