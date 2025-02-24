import { Link } from "react-router-dom";
import {
  Building2,
  Loader,
  Mail,
  Phone,
  Lock,
  LogIn,
  MapPin,
} from "lucide-react";
import { Input } from "../UI";
import { restaurantRegistrationFormValidation } from "@/Utils/formValidation";
import { Autocomplete } from "@react-google-maps/api";
import { AuthLayout } from "@/Layouts";
import { useState } from "react";

interface RestaurantRegistrationProps {
  form: FormType;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  addressAutocomplete: google.maps.places.Autocomplete | null;
  setAddressAutocomplete: (
    autocomplete: google.maps.places.Autocomplete | null
  ) => void;
  errors: FormType;
  setErrors: (errors: FormType) => void;
  handleAddressSelect: () => void;
  setSteps: (steps: { step: string }) => void;
}

const RestaurantRegistration = ({
  form,
  handleChange,
  setSteps,
  setAddressAutocomplete,
  errors,
  setErrors,
  handleAddressSelect,
}: RestaurantRegistrationProps) => {
  const [loading, setLoading] = useState(false);

  const handleNext = () => {
    if (restaurantRegistrationFormValidation(form, setErrors, errors)) {
      setLoading(true);
      setTimeout(() => {
        setSteps({ step: "location" });
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <>
      <AuthLayout
        title="Restaurant Registration 🚀"
        subtitle="Fill in the form below to continue"
      >
        
        <div className="space-y-4">
          <Input
            label="Restaurant Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            icon={<Building2 size={18} />}
            styles="capitalize placeholder:normal-case"
            placeholder="e.g. My Restaurant"
            error={errors.name}
          />
          <Input
            label="Contact Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            icon={<Mail size={18} />}
            styles="lowercase"
            placeholder="e.g. restaurant@example.com"
            error={errors.email}
          />
          <Input
            label="Contact Phone"
            name="phoneNumber"
            type="number"
            value={form.phoneNumber}
            onChange={handleChange}
            icon={<Phone size={18} />}
            placeholder="e.g. 08060000000"
            error={errors.phoneNumber}
          />
          <Autocomplete
            onLoad={(autocomplete) => setAddressAutocomplete(autocomplete)}
            onPlaceChanged={handleAddressSelect}
          >
            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              icon={<MapPin size={18} />}
              placeholder="e.g. 123 Main St, City"
              error={errors.address}
            />
          </Autocomplete>
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            icon={<Lock size={18} />}
            placeholder="minimum 8 characters"
            error={errors.password}
          />
          <button
            onClick={handleNext}
            disabled={loading}
            className="w-full btn bg-primary text-white px-4 h-10 center rounded-full"
          >
            {loading ? (
              <Loader className="animate-spin" size={18} />
            ) : (
              "Continue"
            )}
          </button>
        </div>

        <div className="flex items-center text-sub text-sm center my-6 gap-3">
          <p>Already have an account?</p>
          <Link
            to="/login"
            className="bg-primary/10 text-primary btn px-4 py-2 rounded-full"
          >
            <LogIn size={18} />
            <span>Login</span>
          </Link>
        </div>
      </AuthLayout>
    </>
  );
};

export default RestaurantRegistration;
