import { lazy } from "react";
import { Outlet, RouteObject, useRoutes } from "react-router-dom";
import Layout from "../pages/layout";
import RoutesOfAllPage from "./RoutesOfAllPage";

const Login = lazy(() => import("../pages/login/index"));

const Page404 = lazy(() => import("../pages/page404"));

const RoutesApp: RouteObject[] = [
  {
    index: true,
    path: `login/*`,
    element: <Login />,
  },
  {
    path: ``,
    element: <Layout />,
    children: RoutesOfAllPage,
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

const RoutesOutlet: RouteObject[] = [
  {
    path: `${process.env.PUBLIC_URL}`,
    element: <Outlet />,
    children: RoutesApp,
  },
];

const RoutesOfApp = () => {
  const element = useRoutes(RoutesOutlet);
  return element;
};

export default RoutesOfApp;
