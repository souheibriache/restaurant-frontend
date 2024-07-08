import { useAuth } from "@/modules/auth/AuthProvider";
import { Button } from "./ui/button";
import UserNameMenu from "./UserNameMenu";
import { Link, useNavigate } from "react-router-dom";
const MainNav = () => {
  // const { loginWithRedirect, isAuthenticated } = useAuth0();
  const { user, isAuthenticated, token } = useAuth();
  const navigate = useNavigate();
  const handleLoginButton = () => {
    navigate("/login");
  };

  console.log({ isAuthenticated, user, token });
  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link
            to={"/order-status"}
            className="font-bold hover:text-orange-500"
          >
            Order status
          </Link>
          <UserNameMenu />
        </>
      ) : (
        <Button
          onClick={async () => handleLoginButton()}
          variant={"ghost"}
          className="font-bold text-xl hover:text-orange-500 hover:bg-white"
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
