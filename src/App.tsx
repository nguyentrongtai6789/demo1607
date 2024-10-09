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
  //demo
  http: useEffect(() => {
    if (code)
      dispatch(
        handleCheckAuth({
          value: {
            code: code || "",
            clientId: client_id || `${process.env.REACT_APP_CLIENT_ID}`,
            lang: language,
            urlPrefix: `${process.env.REACT_APP_URL_PREFIX}`,
          },
          pathname: window.location.pathname,
        })
      );
  }, [code]);

  return (
    <Suspense fallback={<LoadingCustom />}>
      {loading && <LoadingCustom />}
      <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
