import React from "react";
import MainLayout from "../Layout/MainLayout";
import Editprofile from "../component/Profile/EditProfile";
import Changepassword from "../component/Profile/ChangePassword";
import Profile from "../component/Profile/Profile";
import Dashboard from "../component/Dashboard/Dashboard";
import UserList from "../component/User/User";
import UserDetails from "../component/User/UserDetails";
import Terms from "../component/Terms&Condition";
import Privacy from "../component/PrivacyPolicy";
import PushNotification from "../component/Notification/PushNotification";
import About from "../component/About Us";
import ProtectedRoute from "../Protected Routes/ProtectedRoute";
import ContactList from "../component/Contact Us";
import ContactDetails from "../component/Contact Us/ContactDetails";

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  element: <MainLayout />,
  children: [
    {
      path: "/Dashboard",
      element: (
        // <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
        // </Suspense>
      ),
    },
    {
      path: "/Profile",
      element: <Profile />,
    },
    {
      path: "/EditProfile",
      element: <Editprofile />,
    },
    {
      path: "/ChangePassword",
      element: <Changepassword />,
    },
    {
      path: "/User_List",
      element: <UserList />,
    },

    {
      path: "/User_Details",
      element: <UserDetails />,
    },
    {
      path: "/ContactUs_List",
      element: <ContactList />,
    },
    {
      path: "/ContactUs_Details",
      element: <ContactDetails />,
    },
    {
      path: "/Push_Notification",
      element: <PushNotification />,
    },

    {
      path: "/About_Us",
      element: <About />,
    },
    {
      path: "/Privacy_Policy",
      element: <Privacy />,
    },
    {
      path: "/TermsofService",
      element: <Terms />,
    },
  ],
};

const MainRoutesWithProtection = {
  element: <MainLayout />,
  children: MainRoutes.children.map((route) => ({
    ...route,
    element: <ProtectedRoute>{route.element}</ProtectedRoute>,
  })),
};

export default MainRoutesWithProtection;
