import { Link, useNavigate } from "react-router-dom";
import { Building2, Loader, Mail, Phone, Lock, LogIn, MapPin } from "lucide-react";
import { Input } from "../UI";
import { useState } from "react";
import { restaurantRegistrationFormValidation } from "@/Utils/formValidation";
import { Autocomplete } from "@react-google-maps/api";
const RestaurantRegistration = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [addressAutocomplete, setAddressAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
    const [form, setForm] = useState<RestaurantRegistrationFormTypes>({
        restaurantName: "",
        email: "",
        phone: "",
        address: "",
        lat: 0,
        lon:0,
        password: "",
        role: "restaurant",
    });
    const [errors, setErrors] = useState<RestaurantRegistrationFormTypes>({
        restaurantName: "",
        email: "",
        phone: "",
        address: "",
        lat: 0,
        lon:0,
        password: "",
        role: "restaurant",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleAddressSelect = ()=>{
      const autocomplete = addressAutocomplete
      if(autocomplete) {
        const place = autocomplete.getPlace();
        if(place){
          const address = place?.formatted_address || "";
          const lat = place?.geometry?.location?.lat() || 0;
          const lon = place?.geometry?.location?.lng() || 0;
          setForm({...form, address, lat, lon});
        }
      }
    } 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (restaurantRegistrationFormValidation(form, setErrors, errors)) {
            setLoading(true);
            setTimeout(() => {
                navigate("/location", { state: { restaurantRegData: form } });
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="Restaurant Name"
                    name="restaurantName"
                    value={form.restaurantName}
                    onChange={handleChange}
                    icon={<Building2 size={18} />}
                    styles="capitalize placeholder:normal-case"
                    placeholder="e.g. My Restaurant"
                    error={errors.restaurantName}
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
                    name="phone"
                    type="number"
                    value={form.phone}
                    onChange={handleChange}
                    icon={<Phone size={18} />}
                    placeholder="e.g. 08060000000"
                    error={errors.phone}
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
                    type="submit"
                    disabled={loading}
                    className="w-full btn bg-primary text-white px-4 h-10 center rounded-full"
                >
                    {loading ? <Loader className="animate-spin" size={18} /> : "Continue"}
                </button>
            </form>

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
        </>
    );
};

export default RestaurantRegistration;