import { useEffect, useState } from "react";
import { handleLoading, loadingCancel } from "../redux/authSlice";
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import { isNull } from "lodash";

const useFetchData = (reloadTable: boolean) => {
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

export default useFetchData;
