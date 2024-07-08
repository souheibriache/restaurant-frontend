import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-forms/UserProfileForm";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { useGetMyUser } from "@/api/MyUserApi";
import { useAuth } from "@/modules/auth/AuthProvider";

type Props = {
  onCheckout: (userFormData: UserFormData) => void;
  disabled: boolean;
  isLoading?: boolean;
};

const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
  // const {
  //   isAuthenticated,
  //   isLoading: isAuthLoading,
  //   loginWithRedirect,
  // } = useAuth0();

  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  const navigate = useNavigate();
  const onLogin = async () => {
    // await loginWithRedirect({
    //   appState: {
    //     returnTo: pathname,
    //   },
    // });
    navigate({ pathname: "/login" });
  };

  if (!isAuthenticated) {
    return (
      <Button onClick={onLogin} className="bg-orange-500 flex-1">
        Login to checkout
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    return <LoadingButton />;
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button disabled={disabled} className="bg-orange-500 from-yellow-100">
          Go to Checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px] bg-gray-50">
        <UserProfileForm
          currentUser={currentUser}
          onSave={onCheckout}
          isLoading={isGetUserLoading}
          title="Confirm delivery details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
