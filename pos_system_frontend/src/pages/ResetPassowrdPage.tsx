import { Button, Input } from "@headlessui/react";
import styles from "../assets/css/registration.module.css";
import SubmittingOverlay from "../components/Authenication/SubmittingOverlay";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from 'react-router-dom';


interface FormData {
  newPassword: string;
}

interface Errors {
  password: string;
}

const ResetPasswordPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({ newPassword: "" });
  const [errors, setErrors] = useState<Errors>({ password: "" });
  const navigate = useNavigate();
  const validate = (): boolean => {
    const password = formData.newPassword.trim();

    if (!password) {
      setErrors({ password: "Type password first" });
      return false;
    }

    if (password.length < 6) {
      setErrors({ password: "Password must be at least 6 characters long" });
      return false;
    }

    setErrors({ password: "" });
    return true;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ newPassword: value });

    if (value.trim().length >= 6) {
      setErrors({ password: "" });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsSubmitting(true);
    
      const response = await fetch("http://localhost:8000/api/password-reset", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
         },
        body: JSON.stringify(formData),
        credentials: "include"
      });

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Password reset failed");

      if (data.status === "success") {
        setFormData({ newPassword: "" });
        alert("Password reset successfully!");
      }

      setErrors({ password: "" });
      navigate('/login');
    } catch (error) {
      console.error(error);

      alert("Something went wrong while resetting your password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={`${styles.custom_font} bg-[url('./assets/image/bg_auth.png')] bg-cover bg-center h-screen`}
    >
      <div className="flex h-full justify-center items-center">
        <div className="bg-white/92 w-29/30 md:w-3/8 rounded-3xl p-6 shadow-xl/20">
          <div className="flex flex-col items-center gap-3">
            <h2 className="text-2xl font-semibold mb-4">Reset Password</h2>

            <form onSubmit={handleSubmit} className="w-full">
              <Input
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
                className={`w-full rounded-4xl p-3 bg-[#F2F2F2] shadow-md border 
                  ${errors.password ? "border-red-500 text-red-500" : "border-gray-200 text-black"} 
                  focus:outline-none focus:ring-1 focus:ring-stone-300 focus:border-transparent 
                  transition duration-100 pr-10`}
              />

              {/* ✅ Show validation message */}
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}

              <Button
                type="submit"
                className="my-3 w-full text-sm px-4 py-3 rounded-full font-medium text-white
                  bg-stone-400 shadow-md border border-transparent
                  hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5
                  transition-all duration-100 ease-in-out cursor-pointer"
              >
                Reset Password
              </Button>
            </form>
          </div>
        </div>
      </div>

      {isSubmitting && <SubmittingOverlay />}
    </div>
  );
};

export default ResetPasswordPage;
