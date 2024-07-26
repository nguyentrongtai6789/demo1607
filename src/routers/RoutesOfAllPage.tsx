import { RouteObject } from "react-router-dom";
import { lazy } from "react";

const DemoRedux = lazy(() => import("../pages/demo/DemoRedux"));

const Demo2 = lazy(() => import("../pages/demo/Demo2"));

const Page404 = lazy(() => import("../pages/page404"));

const QuanLyHoSoCmnd9So = lazy(
  () => import("../pages/QuanLyHoSoCmnd9So/index")
);
const RoutesOfAllPage: RouteObject[] = [
  {
    path: "demo-redux",
    index: true,
    element: <DemoRedux />,
  },
  {
    path: "demo-2",
    index: true,
    element: <Demo2 />,
  },
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

export default RoutesOfAllPage;
