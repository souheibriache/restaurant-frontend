import { useGetMyUser } from "@/api/MyUserApi";
import { getToken, setStoredToken, setStoredUser } from "@/lib/auth";
import { User } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: any | null;
  profile: any | null;
  isAuthenticated: boolean;
  token: string | null;
  isLoading: boolean;
  storeUserData: (user: any, token: string) => void;
  removeUserData: () => void;
  uploadData: () => Promise<void>; // Assuming uploadData returns a promise,
  storeToken: (token: string) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define a custom hook to access the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadData = async () => {
    const data: {
      user: User | null;
      token: string | null;
      isLoggedIn: boolean;
      exp: Date | null;
    } | null = await getToken();
    const { user, token, isLoggedIn, exp } = data || {};

    if (!token && !isLoggedIn) {
      removeUserData();
      setIsLoading(false);
      return;
    }

    setToken(token as string);
    setUser(user || null);
    setIsAuthenticated(true);
    setIsLoading(false);

    if (isLoggedIn) {
      console.log("-------refetch---------");
      const refetchData = new Date(exp || "").getTime() - new Date().getTime();
      console.log(refetchData, { isLoggedIn });
      setTimeout(uploadData, Number(refetchData) >= 0 ? refetchData : 0);
    }
  };

  const storeToken = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  const removeUserData = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    uploadData();
  }, [token]);

  const storeUserData = (user: User, token: string) => {
    setStoredUser(user);
    setStoredToken(token);
    uploadData();
  };

  const { isLoading: fetchUserIsLoading, currentUser } = useGetMyUser();
  // token as string

  useEffect(() => {
    if (!!currentUser && !fetchUserIsLoading) {
      setUser(currentUser);
    }
  }, [currentUser, fetchUserIsLoading]);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile: null,
        isAuthenticated,
        token,
        storeUserData,
        removeUserData,
        isLoading,
        uploadData,
        storeToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
