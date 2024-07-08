import { UserRoundIcon } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useAuth } from "@/modules/auth/AuthProvider";

const UserNameMenu = () => {
  const { user, removeUserData } = useAuth();
  const logout = () => {
    removeUserData();
    window.location.pathname = "/";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2 border-none outline-none">
        {user?.picture ? (
          <img
            src={"user.picture"}
            className="shadow max-w-10 rounded-full h-au    to align-middle border-none"
          />
        ) : (
          <UserRoundIcon />
        )}
        {user?.email}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="-z-50 p-3 px-10 flex flex-col gap-3 zoom-in-150 rounded shadow-l">
        <DropdownMenuItem>
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            to="/user-restaurant"
            className="font-bold hover:text-orange-500"
          >
            User Restaurant
          </Link>
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem>
          <Button
            onClick={async () => logout()}
            className="flex flex-1 font-bold bg-orange-500"
          >
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNameMenu;
