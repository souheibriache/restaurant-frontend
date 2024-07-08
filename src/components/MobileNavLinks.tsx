import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/modules/auth/AuthProvider";

const MobileNavLinks = () => {
  const { removeUserData } = useAuth();
  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        Order Status
      </Link>
      <Link
        to="/user-restaurant"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        My Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-white items-center font-bold hover:text-orange-500"
      >
        User profile
      </Link>
      <Button
        // onClick={async () => logout()}
        onClick={async () => removeUserData()}
        className="flex items-center px-3 font-bold hover:bg-gray-500"
      >
        Logout
      </Button>
    </>
  );
};

export default MobileNavLinks;
