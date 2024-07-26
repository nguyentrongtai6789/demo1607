import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import { lazy } from "react";
import RoutesOfAllPage from "./RoutesOfAllPage";
import Layout from "../pages/layout";

const Login = lazy(() => import("../pages/login/index"));

const routes: RouteObject[] = [
  {
    path: "login",
    index: true,
    element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: RoutesOfAllPage,
  },
];

const RoutesOfApp = () => {
  const element = useRoutes(routes);
  return element;
};

export default RoutesOfApp;
