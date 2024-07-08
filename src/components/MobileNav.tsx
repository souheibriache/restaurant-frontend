import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="text-orange-500" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetTitle>
          {false ? (
            <span className="flex items-center font-bold gap-2">
              {/* {user?.picture ? ( */}
              {false ? (
                <img
                  src={"user.picture"}
                  className="shadow max-w-10 rounded-full h-auto align-middle border-none"
                />
              ) : (
                <CircleUserRound className="text-orange-500" />
              )}
              {"user?.email"}
            </span>
          ) : (
            <span>Welcome to MernEat.com</span>
          )}
        </SheetTitle>
        <Separator />
        <SheetDescription className="flex flex-col gap-4">
          {false ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={async () => {}}
              className="flex-1 font-bold bg-orange-500"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
