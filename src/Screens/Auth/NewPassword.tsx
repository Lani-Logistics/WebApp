import { Input } from "@/Components/UI"
import { AuthLayout } from "@/Layouts"
import { Lock } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

const NewPassword = () => {
    const [form, setForm] = useState({
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        setError({ ...error, [name]: "" });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!form.newPassword){
            setError({ ...error, newPassword: "New password is required" });
            return;
        }
        if(form.newPassword.length < 8){
            setError({ ...error, newPassword: "New password must be at least 8 characters" });
            return;
        }
        if(!form.confirmPassword){
            setError({ ...error, confirmPassword: "Confirm password is required" });
            return;
        }
        if(form.newPassword !== form.confirmPassword){
            setError({ ...error, confirmPassword: "Passwords do not match" });
            return;
        }
        toast.success("Password reset successful");
    }

    return (
        <AuthLayout title="Set New Password 🔑" subtitle="Enter your new password.">
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    label="New Password"
                    name="newPassword"
                    type="password"
                    placeholder="Enter your new password"
                    icon={<Lock size={18} />}
                    value={form.newPassword}
                    onChange={handleChange}
                    styles="placeholder:normal-case"
                    error={error.newPassword}
                />
                <Input
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    icon={<Lock size={18} />}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    styles="placeholder:normal-case"
                    error={error.confirmPassword}
                />
                <button type="submit" className="w-full btn bg-primary text-white px-4 h-10 rounded-full">
                    Set New Password
                </button>
            </form>
        </AuthLayout>
    )
}

export default NewPassword; 