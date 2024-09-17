import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const QuanLyHoSoCmnd9So = lazy(
  () => import("../pages/QuanLyHoSoCmnd9So/index")
);

export const RoutesTraCuu: RouteObject[] = [
  {
    path: "tra-cuu",
    children: [
      {
        path: "hs-cmnd-9-so",
        element: <QuanLyHoSoCmnd9So />,
      },
    ],
  },
];
