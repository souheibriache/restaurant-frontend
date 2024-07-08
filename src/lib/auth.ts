import { User } from "@/types";
import * as jwt from "jwt-decode";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getStoredTokens = () => {
  return {
    token: localStorage.getItem("token"),
    refreshToken: localStorage.getItem("refreshToken"),
  };
};

export const getToken = async () => {
  try {
    const { token } = await getStoredTokens();
    if (!token) return null;

    let data: {
      exp: number;
      iat: number;
      userId: string;
    } = jwt.jwtDecode(token || "");

    const exp = new Date(data.exp * 1000);
    const now = new Date();
    const isLoggedIn = now < exp;

    if (!isLoggedIn) return null;

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/json",
      },
    });

    const user = await response.json();

    return {
      user: user,
      token,
      isLoggedIn,
      exp,
    };
  } catch (error) {
    return null;
  }
};

export const setStoredToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const setStoredUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};
