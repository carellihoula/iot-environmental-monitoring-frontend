import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./components/Authentication/ProtectedRoute";
import AuthenticationPage from "./pages/AuthenticationPage";
import DashboardPage from "./pages/DashboardPage";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthenticationPage />,
  },
  {
    path: "/",
    element: <ProtectedRoute />, // to protect private routes
    children: [
      {
        index: true, // to set the default route
        element: <DashboardPage />,
      },
      {
        path: "profile",
        element: <div>Profile</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>No Found</div>,
  },
]);

export default router;
