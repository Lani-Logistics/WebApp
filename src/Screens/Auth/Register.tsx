import { Input } from "@/Components/UI";
import { AuthLayout } from "@/Layouts";
import { useState } from "react";
import { UserRound, Mail, Phone, Lock, LogIn, Loader } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { registerFormValidation } from "@/Utils/formValidation";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = location.state;
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: role,
  });
  const [errors, setErrors] = useState<RegisterFormTypes>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: role,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const isRider = role === "rider";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (registerFormValidation(form, setErrors, errors)) {
      setLoading(true);
      setTimeout(() => {
        navigate("/location", { state: { form } });
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <AuthLayout
      title="Create an account 🚀"
      subtitle={`You are registering as ${
        isRider ? "a rider." : "a customer."
      } Fill in the form below to continue.`}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          icon={<UserRound size={18} />}
          styles="capitalize placeholder:normal-case"
          placeholder="e.g. John Doe"
          error={errors.name}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          icon={<Mail size={18} />}
          styles="lowercase"
          placeholder="e.g. johndoe@gmail.com"
          error={errors.email}
        />
        <Input
          label="Phone"
          name="phone"
          type="number"
          value={form.phone}
          onChange={handleChange}
          icon={<Phone size={18} />}
          placeholder="e.g. 08060000000"
          error={errors.phone}
        />
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
    </AuthLayout>
  );
};

export default Register;
