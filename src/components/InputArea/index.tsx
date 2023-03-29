import { Action, State } from "@/AppReducer";
import { useCallback, useState } from "react";
import Stack from "../Stack";
import SelectFileType from "./SelectFileType";
import { ScalarStage } from "./type";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const InputArea = (props: Props) => {
  const { state, handleDispatch } = props;
  const [curStage, setCurStage] = useState<ScalarStage>("fileType");

  const handleChangeStage = useCallback(
    (stage: ScalarStage) => {
      setCurStage(stage);
    },
    [setCurStage],
  );

  return (
    <Stack direction={"row"} fullWidth height={"100%"}>
      {curStage === "fileType" && (
        <SelectFileType
          state={state}
          handleDispatch={handleDispatch}
          handleChangeStage={handleChangeStage}
        />
      )}
      {curStage === "language" && <div>Language</div>}
      {curStage === "fileUpload" && <div>fileUpload</div>}
      {curStage === "region" && <div>region</div>}
    </Stack>
  );
};

export default InputArea;
