import { MainLayout } from "@/Layouts";
import {
  ProfileCard,
  ContactInformation,
  AccountActions,
  CompanyInformation,
} from "@/Components/Profile";
import { useAuth } from "@/Hooks";
const Profile = () => {
  const { userData } = useAuth();
  const isRider = userData?.role === "rider";
  return (
    <>
      <MainLayout title="Profile">
        <div className="space-y-4">
          <ProfileCard />
          <ContactInformation />
          {isRider && <CompanyInformation />}
          <AccountActions />
        </div>
      </MainLayout>
    </>
  );
};

export default Profile;
