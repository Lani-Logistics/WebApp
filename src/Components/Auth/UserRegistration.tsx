import { Link, useNavigate } from "react-router-dom"
import { Building2, Loader, Mail, Phone, LogIn, Lock, UserRound } from "lucide-react"
import { Input } from "../UI"
import { useState } from "react"
import { registerFormValidation } from "@/Utils/formValidation"

const UserRegistration = ({role}: {role: string}) => {
    const isRider = role === "rider"
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState<RegisterFormTypes>({
        name: "",
        email: "",
        phone: "",
        company: "",
        password: "",
        role: role,
    });
    const [errors, setErrors] = useState<RegisterFormTypes>({
        name: "",
        email: "",
        phone: "",
        company: "",
        password: "",
        role: role,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (registerFormValidation(form, setErrors, errors)) {
            setLoading(true);
            setTimeout(() => {
                navigate("/location", { state: { userRegData: form } });
                setLoading(false);
            }, 1000);
        }
    };

    return (
        <>
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
                {isRider && (
                    <Input
                        label="Company Name (Optional)"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        icon={<Building2 size={18} />}
                        placeholder="e.g. ABC123"
                        error={errors.company}
                    />
                )}
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
    )
}

export default UserRegistration