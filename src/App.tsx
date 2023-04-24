import { Header, Main, Stack } from "@/components";
import { useCallback, useEffect, useReducer } from "react";
import { Action, INIT_STATE, reducer } from "./AppReducer";

function App() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  const handleDispatch = useCallback(
    (action: Action) => {
      dispatch(action);
    },
    [dispatch],
  );

  return (
    <Stack
      width={"100%"}
      height={"calc(100vh - 24px)"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      {/* <Header /> */}
      <Main state={state} handleDispatch={handleDispatch} />
    </Stack>
  );
}

export default App;
