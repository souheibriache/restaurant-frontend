import { Order } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/order`, {
      method: "Get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error("Error getting Orders");
    return response.json();
  };

  const {
    data: orders,
    isLoading,
    error,
  } = useQuery("fetchOrders", getMyOrdersRequest);
  if (error) toast.error(error.toString());

  return {
    orders,
    isLoading,
  };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
    country: string;
  };
  restaurantId: string;
};

export const useCreateCheckoutSession = () => {
  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ): Promise<{ url: string }> => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) throw new Error("Unable to craate Checkout session");
    return response.json();
  };

  const {
    mutateAsync: createCheckoutSession,
    error,
    isLoading,
    reset,
  } = useMutation(createCheckoutSessionRequest);

  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { createCheckoutSession, isLoading };
};
