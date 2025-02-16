import { toast } from "sonner";
import { useState } from "react";
import { useAuth } from "@/Hooks";
import { Mail, Phone, MapPin, Loader } from "lucide-react";
import { Modal, Input, Select } from "../UI";
import { AnimatePresence } from "framer-motion";
const ContactInformation = () => {
  const { userData, updatePhoneNumber, updateLocation, loading } = useAuth();
  const email = userData?.email;
  const phone = userData?.phone;
  const location = userData?.location;
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

  return (
    <>
    <div className="bg-background border border-line rounded-xl overflow-hidden">
      <div className="p-4 border-b border-line">
        <h3 className="font-medium font-sora text-main">Contact Information</h3>
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



    {/* Modal */}
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

export default ContactInformation;
