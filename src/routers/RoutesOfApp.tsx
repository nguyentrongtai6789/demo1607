import { lazy } from "react";
import type { LoaderFunctionArgs } from "react-router-dom";
import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from "../pages/layout";
import RoutesOfAllPage from "./RoutesOfAllPage";

const Login = lazy(() => import("../pages/login/index"));

const Page404 = lazy(() => import("../pages/page404"));

export const router = createBrowserRouter([
  {
    path: `${process.env.PUBLIC_URL}`,
    element: <Layout />,
    children: RoutesOfAllPage,
    loader: protectedLoader,
  },
  {
    index: true,
    path: `${process.env.PUBLIC_URL}/login/*`,
    element: <Login />,
  },
  {
    path: "*",
    element: <Page404 />,
  },
]);

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  // const useToken = localStorage.getItem("userToken");
  // if (!useToken) {
  //   let params = new URLSearchParams();
  //   params.set("from", new URL(request.url).pathname);
  //   return redirect(`https://laeid3a.teca.vn/dang-nhap` + params.toString());
  // }
  return null;
}
