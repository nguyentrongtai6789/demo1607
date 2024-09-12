import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter,
  RouterProvider,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import { LoadingCustom } from "./customAntd/LoadingCustom";
import { RootState } from "./redux/store";
import { router } from "./routers/RoutesOfApp";
// import RoutesOfApp from "./routers/RoutesOfApp";

function App() {
  const { loading } = useSelector((state: RootState) => state.auth);

  return (
    <Suspense fallback={<LoadingCustom />}>
      {loading && <LoadingCustom />}
      {/* <BrowserRouter>
        <RoutesOfApp />
      </BrowserRouter> */}
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
