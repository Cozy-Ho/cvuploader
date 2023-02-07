import { useNavigate } from "react-router-dom";
import ContentsBox from "../ContentsBox";
import Stack from "../Stack";

const ManualUpload = () => {
  const navigate = useNavigate();

  //
  return (
    <ContentsBox>
      <Stack
        width={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <li>
          <ul>
            <p></p>
          </ul>
          <ul>
            <p></p>
          </ul>
          <ul>
            <p></p>
          </ul>
        </li>
      </Stack>
    </ContentsBox>
  );
};

export default ManualUpload;
