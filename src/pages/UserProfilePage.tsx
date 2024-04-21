import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-forms/UserProfileForm";

const UserProfilePage = () => {
  const { currentUser, isLoading: getUserIsLoading } = useGetMyUser();
  const { isLoading: updateUserIsLoading, updateUser } = useUpdateMyUser();

  if (getUserIsLoading) {
    return <span>Loading...</span>;
  }

  if (!currentUser) {
    return <span>Unable to get user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      isLoading={updateUserIsLoading}
      onSave={updateUser}
    />
  );
};

export default UserProfilePage;
