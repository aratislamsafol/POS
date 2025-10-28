import React, { useState } from "react";

import styles from "../assets/css/registration.module.css";
import { Button } from "@headlessui/react";
import OtpInput from "../components/Authenication/OtpInput";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SubmittingOverlay from "../components/Authenication/SubmittingOverlay";

const OTPVerifyPage: React.FC = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const location = useLocation();
  const email = location.state?.email;
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await fetch("http://localhost:8000/api/verify-otp", {
        method: 'POST',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, otp }),
        credentials: "include",
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Connection Problem");
      }

      if (data.message === "unauthraized") {
        alert("OTP Expired or Wrong Otp");
      }
      setOtp("");
      navigate("/reset-password");
    } catch (error: any) {
      alert(error.message || "Something went wrong");
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
            <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
            <OtpInput length={6} onChanged={setOtp} />

            <Button
              type="button"
              className="my-3 w-30 text-sm px-4 py-3 rounded-full font-medium text-white
                          bg-stone-400 shadow-md border border-transparent
                          hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5
                          transition-all duration-100 ease-in-out cursor-pointer"
              onClick={handleSubmit}
            >
              Verify Otp
            </Button>
          </div>
        </div>
      </div>

      {isSubmitting && <SubmittingOverlay/>}
    </div>
  );
};

export default OTPVerifyPage;
