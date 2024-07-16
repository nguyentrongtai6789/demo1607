import { RouteObject, useRoutes } from "react-router-dom";
import DemoRouters from "./DemoRouters";
import LoginRouters from "./LoginRouters";

const routes: RouteObject[] = [...DemoRouters, ...LoginRouters];

const Routers = () => {
  const element = useRoutes(routes);
  return element;
};

export default Routers;
