import { Button, Input } from "@headlessui/react";
import styles from "../assets/css/registration.module.css";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import SubmittingOverlay from "../components/Authenication/SubmittingOverlay";

interface Error {
  [key: string]: string;
}

interface FormData {
  email: string;
}

const ForgetPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    email: "",
  });
  const [errors, setErrors] = useState<Error>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newError: Error = {};
    if (!formData["email"]) {
      newError.email = "Email required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newError.email = "Invalid email";
    setErrors(newError);
    return Object.keys(newError).length === 0;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch("http://localhost:8000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "OTP Send Failed");
      }

      console.log("Get From API OTP:", data);
      alert("OTP sent successfully!");

      navigate("/otp-verify", {state: {email: data.email}});
      
      setFormData({
        email: "",
      });
      setErrors({});
    } catch (error: any) {
      console.error("API Error:", error);
      alert(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div
      className={`${styles.custom_font} bg-[url('./assets/image/bg_auth.png')] bg-cover bg-center h-screen`}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-white/92 w-29/30 md:w-1/3 rounded-3xl p-5  shadow-xl/20">
          <h3 className="text-center text-gray-500 font-semibold text-xl md:text-2xl mb-6 uppercase">
            Forget Password
          </h3>

          <form onSubmit={handleSubmit}>
            <Input
              className={`w-full rounded-4xl p-3 bg-[#F2F2F2] shadow-md border 
                        ${
                          errors["email"]
                            ? "border-red-500 text-red-500"
                            : "border-gray-200 text-black"
                        } 
                        
                        focus:outline-none focus:ring-1 focus:ring-stone-300 focus:border-transparent 
                        transition duration-100 pr-10`}
              placeholder={errors["email"] || "Type Email Please"}
              name="email"
              type="text"
              value={formData["email"]}
              onChange={handleChange}
              disabled={isSubmitting}
            />
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
        </div>
      </div>

      {isSubmitting && <SubmittingOverlay />}
    </div>
  );
};

export default ForgetPage;
