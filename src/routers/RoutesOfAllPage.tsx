import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const Page404 = lazy(() => import("../pages/page404"));

const TrangChu = lazy(() => import("../pages/TrangChu/index"));

const QuanLyHoSoCmnd9So = lazy(
  () => import("../pages/QuanLyHoSoCmnd9So/index")
);
const RoutesOfAllPage: RouteObject[] = [
  {
    path: "*",
    element: <Page404 />,
  },
  {
    path: "quan-ly-ho-so-cmnd-9-so",
    element: <QuanLyHoSoCmnd9So />,
  },
  {
    path: "trang-chu",
    element: <TrangChu />,
  },
];

export default RoutesOfAllPage;
