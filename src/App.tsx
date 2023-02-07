import { HashRouter, Route, Routes } from "react-router-dom";

import {
  Stack,
  Header,
  Main,
  Select,
  NotFound,
  LocaleUpload,
  ManualUpload,
} from "@/components";
import { useEffect } from "react";

function App() {
  console.log("localstorage test # ", localStorage.getItem("test"));
  useEffect(() => {
    //
    console.log(" send ping to ipcMain  #");
    window.electron.send("ipc-example", "ping");

    console.log("# check env : ", window.electron.env);
  }, []);

  window.electron.receive("ipc-example", args => {
    console.log(args);
  });
  return (
    <Stack
      width={"100%"}
      height={"calc(100vh - 24px)"}
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <HashRouter>
        <Header />
        <Routes>
          <Route path={"/"} element={<Main />} index={true} />
          <Route path={"/1"} element={<LocaleUpload />} />
          <Route path={"/2"} element={<ManualUpload />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </HashRouter>
    </Stack>
  );
}

export default App;
