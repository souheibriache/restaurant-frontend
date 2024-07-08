import { getToken } from "@/lib/auth";
import { useAuth } from "@/modules/auth/AuthProvider";
import { User } from "@/types";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
  picture?: string;
  name?: string;
};

export const useGetMyUser = () => {
  const getMyUserRequest = async (): Promise<User | null> => {
    console.log("GET MY USER HOOK");
    const accessToken = localStorage.getItem("token");
    if (!accessToken) return null;
    console.log({ accessToken });
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch User");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return {
    currentUser,
    isLoading,
  };
};

export type RegisterUserRequest = {
  email: string;
  password: string;
  name: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export const useRegisterUser = () => {
  const registerUser = async (registerUserData: RegisterUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/my/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerUserData),
    });
    if (!response.ok) throw new Error("Unable to craate User");
    const jsonResponse = await response.json();
    console.log({ jsonResponse });
    localStorage.setItem("accessToken", jsonResponse.accessToken);
    return jsonResponse;
  };

  const {
    error,
    mutateAsync: registerUserRequest,
    isLoading,
    isSuccess,
    reset,
  } = useMutation(registerUser);
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { isLoading, registerUserRequest, isSuccess };
};

export const useLoginUser = () => {
  const { storeToken } = useAuth();
  const loginUser = async (loginUserData: LoginUserRequest) => {
    console.log(import.meta.env);

    const response = await fetch(`${API_BASE_URL}/api/my/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginUserData),
    });
    if (!response) throw new Error("Unable to login User");
    return response.json();
  };

  const {
    error,
    mutateAsync: loginUserRequest,
    isLoading,
    reset,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data) => {
      await storeToken(data.accessToken);
      console.log(data);
      await getToken();
    },
  });
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { isLoading, loginUserRequest };
};

export const useCreateMyUser = () => {
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw Error("Failed to create user");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isSuccess,
    isError,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  country: string;
  city: string;
};

export const useUpdateMyUser = () => {
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("User profile updated");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return { updateUser, isLoading, isSuccess, error, reset };
};
