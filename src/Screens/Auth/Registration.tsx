import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Role from "./Role";
import SubRole from "./SubRole";
import RestaurantRegistration from "@/Components/Auth/RestaurantRegistration";
import Location from "./Location";
import { UserRegistration } from "@/Components/Auth";

const Registration = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const step = searchParams.get("step") || "role";

  const [form, setForm] = useState<FormType>({
    role: "",
    subRole: "",
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    businessName: "",
    businessRegNo: "",
    address: "",
    location: "",
    lat: 0,
    lon: 0,
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    businessName: "",
    businessRegNo: "",
    address: "",
    location: "",
    lat: 0,
    lon: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleNextStep = () => {
    setLoading(true);
    setTimeout(() => {
      setSearchParams({ step: "subRole", role: form.role || "" });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const [addressAutocomplete, setAddressAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const handleAddressSelect = () => {
    const autocomplete = addressAutocomplete;
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place) {
        const address = place?.formatted_address || "";
        const lat = place?.geometry?.location?.lat() || 0;
        const lon = place?.geometry?.location?.lng() || 0;
        setForm({ ...form, address, lat, lon });
      }
    }
  };

  return (
    <>
      {step === "role" && (
        <Role
          handleNextStep={handleNextStep}
          form={form}
          handleChange={handleChange}
          loading={loading}
          setSteps={setSearchParams}
        />
      )}
      {step === "subRole" && (
        <SubRole
          form={form}
          handleChange={handleChange}
          setSteps={setSearchParams}
        />
      )}
      {step === "register" && (
        <UserRegistration
          form={form}
          setSteps={setSearchParams}
          addressAutocomplete={addressAutocomplete}
          setAddressAutocomplete={setAddressAutocomplete}
          errors={errors}
          setErrors={setErrors}
          handleAddressSelect={handleAddressSelect}
          handleChange={handleChange}
        />
      )}
      {step === "restaurant" && (
        <RestaurantRegistration
          form={form}
          setSteps={setSearchParams}
          addressAutocomplete={addressAutocomplete}
          setAddressAutocomplete={setAddressAutocomplete}
          errors={errors}
          setErrors={setErrors}
          handleAddressSelect={handleAddressSelect}
          handleChange={handleChange}
          loading={loading}
        />
      )}
      {step === "location" && (
        <Location
          form={form}
          setSteps={setSearchParams}
          handleChange={handleChange}
          loading={loading}
        />
      )}
    </>
  );
};

export default Registration;
