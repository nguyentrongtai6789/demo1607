import React, { FunctionComponent } from "react";
import { useSelector, useDispatch } from "react-redux";

export const DemoRedux: FunctionComponent = (props) => {
  // const count = useSelector((state: RootState) => state.counterReducer.value);
  // const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          // onClick={() => dispatch(increment(2))}
        >
          Increment
        </button>
        {/* <span>{count}</span> */}
        <button
          aria-label="Decrement value"
          // onClick={() => dispatch(decrement(5))}
        >
          Decrement
        </button>
      </div>
    </div>
  );
};

export default DemoRedux;
