import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentsBox from "../ContentsBox";
import Stack from "../Stack";
import SelectFile from "./SelectFile";

type CurStage = "fileUpload" | "region" | "language" | "type";

type SelectData = {
  id: string;
  value: string;
  name: string;
};

// const SelectValue:SelectData[] = [
//   {id: }
// ]

const ManualUpload = () => {
  const navigate = useNavigate();

  const [curStage, setcurStage] = useState<CurStage>("fileUpload");
  //
  return (
    <ContentsBox>
      <Stack
        width={"100%"}
        direction={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        spacing={1}
      >
        {curStage === "fileUpload" && <SelectFile />}
      </Stack>
    </ContentsBox>
  );
};

export default ManualUpload;
