import { useLoginUser } from "@/api/MyUserApi";
import LoginUserForm from "@/forms/auth-form/LoginUserForm";

const LoginPage = () => {
  const { isLoading, loginUserRequest } = useLoginUser();

  return <LoginUserForm onSave={loginUserRequest} isLoading={isLoading} />;
};

export default LoginPage;
