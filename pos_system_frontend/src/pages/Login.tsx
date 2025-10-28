import {  useState } from "react";
import styles from "../assets/css/registration.module.css";
import LoginForm from "../components/LoginForm";
import SubmittingOverlay from "../components/Authenication/SubmittingOverlay";
import { Link } from "react-router-dom";


const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div
      className={`${styles.custom_font} bg-[url('./assets/image/bg_auth.png')] bg-cover bg-center h-screen`}
    >
      <div className="flex justify-center items-center w-full h-full">
        <div className="bg-white/92 w-29/30 md:w-1/3 rounded-3xl p-5  shadow-xl/20">
          <h3 className="text-center text-gray-500 font-semibold text-xl md:text-2xl mb-6 uppercase">
            Log In to continue
          </h3>

          <LoginForm 
            setIsSubmitting={setIsSubmitting}
            isSubmitting={isSubmitting}
          />

          <div className="flex gap-2 items-center justify-self-end mt-1">
            <Link className="p-1 px-3 border text-white
              bg-stone-400 shadow-md text-sm border-transparent
              hover:bg-green-600 hover:shadow-lg hover:-translate-y-0.5
              transition-all duration-300 ease-in-out cursor-pointer rounded-2xl" to="registration">Sign Up</Link>
            <Link className="text-blue-600 hover:text-blue-800" to="registration">Forget Password</Link>
          </div>
        </div>
      </div>
      {isSubmitting && <SubmittingOverlay/>}
    </div>
  );
};

export default Login;
