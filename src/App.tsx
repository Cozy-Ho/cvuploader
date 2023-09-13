import { Header, Main, Stack } from "@/components";
import { useCallback, useEffect, useReducer } from "react";
import { Action, INIT_STATE, reducer } from "./AppReducer";
const { ipcRenderer } = window.require("electron");

function App() {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);
  ipcRenderer.send("ipc-example", "ping");

  const handleDispatch = useCallback(
    (action: Action) => {
      dispatch(action);
    },
    [dispatch],
  );
  useEffect(() => {
    ipcRenderer.on("ipc-example", (event, args) => {
      console.log(args);
    });
    return () => {
      ipcRenderer.removeAllListeners("ipc-example");
    };
  }, []);

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
