import { createBrowserRouter } from "react-router-dom";
import Root from "../root/Root";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import DashBoardLayout from "../root/DashBoardLayout";

import Registration from "../pages/Registration";
import Login from "../pages/Login";
import ForgetPage from "../pages/SendOtpPage";
import OTPVerifyPage from "../pages/OtpVerifyPage";
import ResetPasswordPage from "../pages/ResetPassowrdPage";
import { generateRoutes } from "../components/Dashboard/generateRoutes";

const dashboardChildren = generateRoutes();

// src/routes/AppRoutes.tsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "login", element: <GuestRoute><Login /></GuestRoute> },
      { path: "registration", element: <Registration /> },
      { path: "send-otp", element: <ForgetPage /> },
      { path: "otp-verify", element: <OTPVerifyPage /> },
      { path: "reset-password", element: <ProtectedRoute><ResetPasswordPage /></ProtectedRoute> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashBoardLayout />
      </ProtectedRoute>
    ),
    children: dashboardChildren, 
  },
]);


export default router;
