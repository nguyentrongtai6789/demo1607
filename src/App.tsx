import { Suspense } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { LoadingCustom } from "./customAntd/LoadingCustom";
import { RootState } from "./redux/store";
import RoutesOfApp from "./routers/RoutesOfApp";

function App() {
  const { loading } = useSelector((state: RootState) => state.auth);

  return (
    <Suspense fallback={<LoadingCustom />}>
      {loading && <LoadingCustom />}
      <BrowserRouter>
        <RoutesOfApp />
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
