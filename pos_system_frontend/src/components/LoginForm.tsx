import { Button, Input } from "@headlessui/react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

interface props {
  onSubmitStart?: () => void;
  onSubmitEnd?: () => void;
  isSubmitting: boolean;
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>;
}
interface PasswordVisibility {
  password: boolean;
  confirmPassword: boolean;
}
type FormData = {
  email: string;
  password: string;
};
interface Errors {
  [key: string]: string;
}
const LoginForm = ({
  onSubmitStart,
  onSubmitEnd,
  isSubmitting,
  setIsSubmitting,
}: props) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const {setToken} = useAuthStore();

  const [showPassword, setShowPassword] = useState<PasswordVisibility>({
    password: false,
    confirmPassword: false,
  });

  const [errors, setErrors] = useState<Errors>({});

  const validate = (): boolean => {
    const newErrors: Errors = {};

    if (!formData["email"]) {
      newErrors.email = "Email required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email";

    if (!formData.password) newErrors.password = "Password required";
    else if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fields: { name: keyof FormData; type?: string; placeholder: string }[] =
    [
      { name: "email", placeholder: "Email" },
      { name: "password", placeholder: "Password", type: "password" },
    ];

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    onSubmitStart?.();
    console.log("formData", formData);
    try {
      const response = await fetch("http://localhost:8000/api/user-login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Registration failed");
      }

      const data = await response.json();
      console.log("Api Data:", data);
      setToken(data.token);
      alert("Login Successful!");

      setFormData({
        email: "",
        password: "",
      });

      setErrors({});
      navigate("/dashboard");
    } catch (error: any) {
      console.error("API Error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
      onSubmitEnd?.();
    }
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3 relative">
      {fields.map(({ name, placeholder, type }, index) => (
        <div key={index} className="relative">
          <Input
            type={
              type === "password"
                ? showPassword[name as keyof PasswordVisibility]
                  ? "text"
                  : "password"
                : "email"
            }
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={errors[name] || placeholder}
            className={`w-full rounded-4xl p-3 bg-[#F2F2F2] shadow-md border 
                        ${
                          errors[name]
                            ? "border-red-500 text-red-500"
                            : "border-gray-200 text-black"
                        } 
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
                  [name as keyof PasswordVisibility]:
                    !prev[name as keyof PasswordVisibility],
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

      <Button
        type="submit"
        className="my-3 text-sm px-4 py-3 rounded-full w-full font-medium text-white
              bg-stone-400 shadow-md border border-transparent
              hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5
              transition-all duration-300 ease-in-out cursor-pointer"
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </form>
  );
};

export default LoginForm;
