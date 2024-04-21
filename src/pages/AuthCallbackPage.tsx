import { useCreateMyUser } from "@/api/MyUserApi";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {
  const { user } = useAuth0();
  const { createUser } = useCreateMyUser();
  const navigate = useNavigate();

  const hasCreatedUser = useRef(false);

  useEffect(() => {
    if ((user?.sub && user?.email, !hasCreatedUser.current)) {
      createUser({
        auth0Id: user?.sub as string,
        email: user?.email as string,
        picture: user?.picture,
        name: user?.name,
      });
      hasCreatedUser.current = true;
    }
    navigate("/");
  }, [createUser, navigate, user]);

  return <>Loading...</>;
};

export default AuthCallbackPage;
