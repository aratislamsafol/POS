import type{ ChangeEvent, FormEvent } from "react";
import {useState} from "react";
import { Button, Input } from "@headlessui/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}

interface PasswordVisibility {
  password: boolean;
  confirmPassword: boolean;
}

interface Errors {
  [key: string]: string;
}

interface Props {
  onSubmitStart?: () => void;
  onSubmitEnd?: () => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}

const RegistrationForm = ({ onSubmitStart, onSubmitEnd, isSubmitting, setIsSubmitting }: Props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState<PasswordVisibility>({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<Errors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";

    if (!formData.email) newErrors.email = "Email required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.mobile) newErrors.mobile = "Mobile required";
    else if (!/^(\+?88)?01[3-9]\d{8}$/.test(formData.mobile))
      newErrors.mobile = "Invalid mobile";

    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Confirm password required";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    onSubmitStart?.();

    try {
      const response = await fetch("http://localhost:8000/api/user-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Registration failed");
      }

      const data = await response.json();
      console.log("API Response:", data);
      alert("Registration Successful!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      navigate("/login");

    } catch (error: any) {
      console.error("API Error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
      onSubmitEnd?.();
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const fields: { name: keyof FormData; placeholder: string; type?: string }[] = [
    { name: "firstName", placeholder: "First Name" },
    { name: "lastName", placeholder: "Last Name" },
    { name: "email", placeholder: "Email" },
    { name: "mobile", placeholder: "Mobile" },
    { name: "password", placeholder: "Password", type: "password" },
    { name: "confirmPassword", placeholder: "Confirm Password", type: "password" },
  ];

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative">
      {fields.map(({ name, placeholder, type }, index) => (
        <div key={index} className="relative">
          <Input
            type={
              type === "password"
                ? showPassword[name as keyof PasswordVisibility]
                  ? "text"
                  : "password"
                : name === "email"
                ? "email"
                : name === "mobile"
                ? "tel"
                : "text"
            }
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={errors[name] || placeholder}
            className={`w-full rounded-4xl p-3 bg-[#F2F2F2] shadow-md border 
                        ${errors[name] ? "border-red-500 text-red-500" : "border-gray-200 text-black"} 
                        focus:outline-none focus:ring-1 focus:ring-stone-300 focus:border-transparent 
                        transition duration-100 pr-10`}
            disabled={isSubmitting}
          />
          {type === "password" && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700"
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  [name as keyof PasswordVisibility]: !prev[name as keyof PasswordVisibility],
                }))
              }
            >
              {showPassword[name as keyof PasswordVisibility] ? (
                <EyeOffIcon size={18} />
              ) : (
                <EyeIcon size={18} />
              )}
            </div>
          )}
        </div>
      ))}

      <div className="flex gap-2 mt-6 justify-between sm:col-span-2 items-center">
  {/* Left side button */}
  <Button
    type="button"
    onClick={() => navigate(-1)} 
    className="text-sm px-4 py-2 rounded-full font-medium text-white
               bg-gray-400 shadow-md border border-transparent
               hover:bg-gray-500 hover:shadow-lg hover:-translate-y-0.5
               transition-all duration-300 ease-in-out cursor-pointer"
  >
    ← Back
  </Button>

  {/* Right side buttons */}
  <div className="flex gap-2">
    <Button
      type="submit"
      className="text-sm px-4 py-2 rounded-full w-fit font-medium text-white
                 bg-stone-400 shadow-md border border-transparent
                 hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5
                 transition-all duration-300 ease-in-out cursor-pointer"
      disabled={isSubmitting}
    >
      Submit
    </Button>

    <Button
      type="button"
      onClick={handleCancel}
      className="text-sm px-4 py-2 rounded-full w-fit font-medium text-white
                 bg-stone-400 shadow-md border border-transparent
                 hover:bg-red-500 hover:shadow-lg hover:-translate-y-0.5
                 transition-all duration-300 ease-in-out cursor-pointer"
      disabled={isSubmitting}
    >
      Cancel
    </Button>
  </div>
</div>

    </form>
  );
};

export default RegistrationForm;
