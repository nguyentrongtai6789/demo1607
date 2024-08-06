import { lazy } from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import Layout from "../pages/layout";
import RoutesOfAllPage from "./RoutesOfAllPage";

const Login = lazy(() => import("../pages/login/index"));

const Page404 = lazy(() => import("../pages/page404"));

const routes: RouteObject[] = [
  {
    index: true,
    path: `${process.env.PUBLIC_URL}/login`,
    element: <Login />,
  },
  {
    path: `${process.env.PUBLIC_URL}`,
    element: <Layout />,
    children: RoutesOfAllPage,
  },
  {
    path: "*",
    element: <Page404 />,
  },
];

const RoutesOfApp = () => {
  const element = useRoutes(routes);
  return element;
};

export default RoutesOfApp;
