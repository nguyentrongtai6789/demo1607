import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { LoadingCustom } from "./customAntd/LoadingCustom";
import { RootState, useAppDispatch } from "./redux/store";
import { router } from "./routers/RoutesOfApp";
import { handleCheckAuth } from "./redux/authActions";

function App() {
  const { loading, language } = useSelector((state: RootState) => state.auth);

  const dispatch = useAppDispatch();

  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get("code");
  const client_id = urlParams.get("client_id");

  useEffect(() => {
    dispatch(
      handleCheckAuth({
        code: code || "",
        clientId: client_id || "",
        lang: language,
        urlPrefix: "http://localhost:3033/lao-eid/",
      })
    );
  }, []);

  return (
    <Suspense fallback={<LoadingCustom />}>
      {loading && <LoadingCustom />}
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
