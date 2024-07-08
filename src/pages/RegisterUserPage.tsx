import { useRegisterUser } from "@/api/MyUserApi";
import RegisterUserForm from "@/forms/auth-form/RegisterUserForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RegisterUserPage = () => {
  const { isLoading, registerUserRequest, isSuccess } = useRegisterUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);
  return (
    <RegisterUserForm onSave={registerUserRequest} isLoading={isLoading} />
  );
};

export default RegisterUserPage;
