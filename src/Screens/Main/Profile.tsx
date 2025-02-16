import { MainLayout } from "@/Layouts";
import {
  ProfileCard,
  ContactInformation,
  AccountActions,
} from "@/Components/Profile";
const Profile = () => {
  return (
    <>
      <MainLayout title="Profile">
        <div className="space-y-4">
          <ProfileCard />
          <ContactInformation />
          <AccountActions />
        </div>
      </MainLayout>
    </>
  );
};

export default Profile;
