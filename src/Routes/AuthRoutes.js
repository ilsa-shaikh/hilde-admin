// import { lazy } from "react";

// project import
// import Loadable from "../Loader/Loadable";
import AuthLayout from "../Layout/AuthLayout";
import Signin from "../component/Auth/Signin";
import ForgotPassword from "../component/Auth/ForgotPassword";
import OTPverify from "../component/Auth/OtpVerify";
import ResetPassword from "../component/Auth/ResetPassword";
import Privacydata from "../component/Privacydata";
import Termdata from "../component/Termsdata";

// render - login
// const AuthLogin = Loadable(lazy(() => import("../component/Auth/Signin")));
// const AuthForget = Loadable(
//   lazy(() => import("../component/Auth/ForgotPassword"))
// );

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  element: <AuthLayout />,
  children: [
    {
      path: "/",
      element: <Signin />,
    },
    {
      path: "ForgetPassword",
      element: <ForgotPassword />,
    },
    {
      path: "OTPverify",
      element: <OTPverify />,
    },
    {
      path: "ResetPassword",
      element: <ResetPassword />,
    },
    {
      path: "/PrivacyPolicy",
      element: <Privacydata />,
    },
    {
      path: "/Terms&Condition",
      element: <Termdata />,
    },
  ],
};

export default LoginRoutes;
