import { useCallback, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentsBox from "../ContentsBox";
import Stack from "../Stack";
import SelectFile from "./SelectFile";
import { INIT_MANUAL_STATE, ManualAction, reducer } from "./ManualReducer";
import { StageList } from "./type";

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

  const [state, dispatch] = useReducer(reducer, INIT_MANUAL_STATE);

  const handleDispatch = useCallback(
    (action: ManualAction) => dispatch(action),
    [],
  );

  const handleClickPrevStage = () => {
    const newStage = StageList[state.curStage.prev];
    handleDispatch({
      type: "UPDATE_CUR_STAGE",
      inputStage: newStage,
    });
  };

  const handleClickNextStage = () => {
    const newStage = StageList[state.curStage.next];
    handleDispatch({
      type: "UPDATE_CUR_STAGE",
      inputStage: newStage,
    });
  };

  //
  return (
    <Stack direction={"row"}>
      <Stack justifyContent={"center"} alignItems={"center"} width={120}>
        {state.curStage.prev && (
          <Stack
            width={25}
            justifyContent={"center"}
            alignItems={"center"}
            style={{
              border: `1px solid white`,
              borderRadius: 10,
              cursor: "pointer",
            }}
            onClick={handleClickPrevStage}
          >
            {"<"}
          </Stack>
        )}
      </Stack>
      <ContentsBox>
        <Stack
          width={"100%"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={1}
        >
          {state.curStage.current === "fileUpload" && <SelectFile />}
          {state.curStage.current === "language" && <div>hi</div>}
        </Stack>
      </ContentsBox>
      <Stack justifyContent={"center"} alignItems={"center"} width={120}>
        {state.curStage.next && (
          <Stack
            width={25}
            justifyContent={"center"}
            alignItems={"center"}
            style={{
              border: `1px solid white`,
              borderRadius: 10,
              cursor: "pointer",
            }}
            onClick={handleClickNextStage}
          >
            {">"}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

export default ManualUpload;
