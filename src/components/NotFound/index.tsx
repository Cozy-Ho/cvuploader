import { useLocation } from "react-router-dom";
import ContentsBox from "../ContentsBox";
import Stack from "../Common/Stack";

const NotFound = () => {
  //
  const location = useLocation();

  return (
    <ContentsBox>
      <Stack
        width={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <h2>올바르지 않은 접근입니다!</h2>
        <h3>Page not found!</h3>
      </Stack>
    </ContentsBox>
  );
};

export default NotFound;
