import { useGetRestaurantById } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { Card } from "@/components/ui/card";
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
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((previous) => {
      if (cartItem.quantity === 1)
        return previous.filter((element) => element._id !== cartItem._id);
      else
        return previous.map((element) =>
          element._id === cartItem._id
            ? { ...element, quantity: element.quantity - 1 }
            : element
        );
    });
  };
  if (isLoading || !restaurant) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          className="h-full w-full rounded-md object-cover"
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
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
