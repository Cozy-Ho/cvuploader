import { useNavigate } from "react-router-dom";
import { ContentsBox, Stack } from "@/components";

const Main = () => {
  const navigate = useNavigate();
  return (
    <ContentsBox justifyContent={"center"} alignItems={"center"}>
      <Stack
        width={"50%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => {
          navigate("/1");
        }}
        style={{
          backgroundColor: "#ffddfc",
          borderRadius: "16px 0 0 16px",
          // opacity: "0.5",
          color: "black",
        }}
      >
        <h2>{"Locale"}</h2>
      </Stack>
      <Stack
        width={"50%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        onClick={() => {
          navigate("/2");
        }}
        style={{
          backgroundColor: "#bffffb",
          borderRadius: "0 16px 16px 0",
          color: "black",
        }}
      >
        <h2>{"Manual"}</h2>
      </Stack>
    </ContentsBox>
  );
};
export default Main;
