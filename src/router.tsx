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
    element: <ProtectedRoute />, // Protéger les routes privées
    children: [
      {
        index: true, // Route par défaut pour `/`
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
