import { MainLayout } from "@/Layouts";
import { Link } from "react-router-dom";
import { Phone, Mail, ShieldCheck, LogOut, MapPin, Loader } from "lucide-react";
import { useAuth } from "@/Hooks";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Input, Modal, Select } from "@/Components/UI";
import { toast } from "sonner";

const Profile = () => {
  const { userData, updatePhoneNumber, updateLocation, loading, logout } = useAuth();
  const name = userData?.name;
  const role = userData?.role;
  const email = userData?.email;
  const phone = userData?.phone;
  const location = userData?.location;
  const isAdmin = userData?.isAdmin;
  const [isOpen, setIsOpen] = useState(false);
  const [change, setChange] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(userData?.phone);
  const [myLocation, setMyLocation] = useState(userData?.location);
  const toggleModal = (key: string) => {
    setIsOpen((prev) => !prev);
    setChange(key);
  };
  const handlePhoneChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(updatePhoneNumber(phoneNumber), {
      loading: "Updating phone number...",
      success: () => {
        setPhoneNumber("");
        setIsOpen(false);
        return "Phone number updated successfully";
      },
      error: (error) => (error as Error).message,
    });
  };
  const handleLocationChange = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(updateLocation(myLocation), {
      loading: "Updating location...",
      success: () => {
        setMyLocation("");
        setIsOpen(false);
        return "Location updated successfully";
      },
      error: (error) => (error as Error).message,
    });
  };
  const handleLogout = () => {
    toast.promise(logout(), {
      loading: "Logging out...",
      success: () => "Logged out successfully",
      error: (error) => (error as Error).message,
    });
  };
  return (
    <>
      <MainLayout title="Profile">
        <div className="space-y-4">
          {/* Profile Card */}
          <div className="bg-background border border-line rounded-xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-background_2 overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${name}&background=random`}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="">
                  <h2 className="text-xl font-semibold text-main">{name}</h2>
                  <p className="text-sub text-sm capitalize mb-2">{role}</p>
                  {isAdmin && (
                    <span className="px-2 py-1 pr-4 bg-orange-500/10 text-primary text-sm font-medium rounded-full inline-flex items-center gap-1">
                      <ShieldCheck size={16} />
                      Admin
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-background border border-line rounded-xl overflow-hidden">
            <div className="p-4 border-b border-line">
              <h3 className="font-medium font-sora text-main">
                Contact Information
              </h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-primary mt-1" />
                <div>
                  <p className="text-sub text-xs">Email Address</p>
                  <p className="text-main text-sm">{email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone size={18} className="text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sub text-xs">Phone Number</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-main text-sm">{phone}</p>
                    <button
                      onClick={() => toggleModal("phone")}
                      className="text-sm text-primary font-medium font-sora hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-primary mt-1" />
                <div className="flex-1">
                  <p className="text-sub text-xs">Location</p>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-main text-sm">{location}</p>
                    <button
                      onClick={() => toggleModal("location")}
                      className="text-sm text-primary font-medium font-sora hover:underline"
                    >
                      Change
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Actions */}
          <div className="bg-background border border-line rounded-xl overflow-hidden">
            <div className="p-4 border-b border-line">
              <h3 className="font-semibold text-main">Account Actions</h3>
            </div>
            <div className="p-4">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="bg-primary/10 text-primary h-10 center gap-2 text-sm font-sora font-medium rounded-lg mb-2"
                >
                  Admin Dashboard
                </Link>
              )}
              <button disabled={loading} onClick={handleLogout} className="w-full center gap-2 h-10 text-sm font-sora font-medium bg-red-500 text-white rounded-lg hover:bg-red-500/90 transition-colors">
                {loading ? <Loader className="animate-spin" size={18} /> : <LogOut size={18} />}
                {loading ? "Logging out..." : "Log Out"}
              </button>
            </div>
          </div>
        </div>
      </MainLayout>

      <AnimatePresence>
        {isOpen && (
          <Modal
            title={change}
            isOpen={isOpen}
            toggleModal={() => setIsOpen(false)}
          >
            {change === "phone" && (
              <form onSubmit={handlePhoneChange} className="space-y-4">
                <p className="text-sub text-xs">
                  Please enter your new phone number
                </p>
                <Input
                  label="Phone Number"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  name="phone"
                  icon={<Phone size={18} />}
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-primary btn w-full text-white px-4 h-10 rounded-lg"
                >
                  {loading ? (
                    <Loader className="animate-spin" size={18} />
                  ) : (
                    "Change"
                  )}
                </button>
              </form>
            )}

            {change === "location" && (
              <form onSubmit={handleLocationChange} className="space-y-4">
                <p className="text-sub text-xs">
                  Please enter your new location
                </p>
                <Select
                  label="Location"
                  value={myLocation}
                  onChange={(e) => setMyLocation(e.target.value)}
                  name="location"
                  options={[
                    {
                      value: "Uyo",
                      label: "Uyo",
                    },
                    {
                      value: "Port Harcourt",
                      label: "Port Harcourt",
                    },
                    {
                      value: "Benin",
                      label: "Benin",
                    },
                  ]}
                />
                <button
                  disabled={loading}
                  type="submit"
                  className="bg-primary btn w-full text-white px-4 h-10 rounded-lg"
                >
                  {loading ? (
                    <Loader className="animate-spin" size={18} />
                  ) : (
                    "Change"
                  )}
                </button>
              </form>
            )}
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Profile;
