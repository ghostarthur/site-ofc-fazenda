import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { ClientOrder } from "./components/ClientOrder";
import { Dashboard } from "./components/Dashboard";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/pedido",
    Component: ClientOrder,
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      { index: true, Component: Dashboard },
    ],
  },
]);