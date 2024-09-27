import { isNull } from "lodash";
import { useEffect, useState } from "react";
import { handleLoading, loadingCancel } from "../redux/authSlice";
import { useAppDispatch } from "../redux/store";

const useLoading = () => {
  const [loading, setLoading] = useState<boolean | null>(null);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isNull(loading)) return;
    if (loading) {
      dispatch(handleLoading());
    } else {
      dispatch(loadingCancel());
    }
  }, [loading]);

  return { setLoading };
};

export default useLoading;
