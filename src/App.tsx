import { HashRouter, Route, Routes } from "react-router-dom";
import { Stack, Header, Main, Select, NotFound } from "@/components";

function App() {
  console.log("localstorage test # ", localStorage.getItem("test"));
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
          <Route path={"/1"} element={<Select />} />
          <Route path={"/2"} element={<Select />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </HashRouter>
    </Stack>
  );
}

export default App;
