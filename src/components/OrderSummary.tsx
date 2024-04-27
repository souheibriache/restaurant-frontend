import { CartItem } from "@/pages/RestaurantDetails";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ restaurant, cartItems, removeFromCart }: Props) => {
  const getTotalCost = () => {
    const totalInPense = cartItems.reduce((total, cartItem) => {
      return total + cartItem.price * cartItem.quantity;
    }, 0);

    const totalWidhDelivery = totalInPense + restaurant.deliveryPrice;
    return (totalWidhDelivery / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your order</span>
          <span>£{getTotalCost()}</span>
          {/* <span>£{0}</span> */}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((menuItem) => (
          <div className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {menuItem.quantity}
              </Badge>
              {menuItem.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursot-pointer "
                color="red"
                size={20}
                onClick={() => removeFromCart(menuItem)}
              />
              £{((menuItem.price * menuItem.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
