import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Page404 = lazy(() => import("../pages/page404"));

const QuanLyHoSoCmnd9So = lazy(
  () => import("../pages/QuanLyHoSoCmnd9So/index")
);

const LoginRouters: RouteObject[] = [
  {
    path: "*",
    index: true,
    element: <Page404 />,
  },
  {
    path: "quan-ly-ho-so-cmnd-9-so",
    index: true,
    element: <QuanLyHoSoCmnd9So />,
  },
];

export default LoginRouters;
