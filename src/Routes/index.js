import { useRoutes } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import View from "../component/About Us/Viewcontent";
import MainRoutesWithProtection from "./MainRoutes";
import ProtectedRoute from "../Protected Routes/ProtectedRoute";
import MainRoutes from "./MainRoutes";

export default function Router() {
  return useRoutes([
    // MainRoutesWithProtection,
    MainRoutes,
    AuthRoutes,
    {
      path: "/View",
      element: (
        <ProtectedRoute>
          <View />
        </ProtectedRoute>
      ),
    },
  ]);
}
