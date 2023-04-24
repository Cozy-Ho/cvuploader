import { Action, State } from "@/AppReducer";
import styled from "@emotion/styled";
import Stack from "../Stack";
import LanguageSelect from "./LanguageSelect";
import SelectFile from "./SelectFile";
import SelectFileType from "./SelectFileType";
import ServerSelect from "./ServerSelect";
import { v4 } from "uuid";
import Upload from "./Upload";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const InputArea = (props: Props) => {
  const { state, handleDispatch } = props;

  const { stageData } = state;

  const validateStagedData = (): boolean => {
    if (!stageData || !stageData.file) {
      alert("파일을 선택해주세요.");
      return false;
    }
    if (!stageData.type) {
      alert("파일 타입을 선택해주세요.");
      return false;
    }
    if (!stageData.language) {
      alert("언어를 선택해주세요.");
      return false;
    }
    if (!stageData.region.length) {
      alert("서버를 선택해주세요.");
      return false;
    }

    return true;
  };

  const handleClickUpload = () => {
    if (!validateStagedData()) {
      return;
    }
    handleDispatch({
      type: "ADD_UPLOAD_DATA",
      data: {
        ...state.stageData,
        id: v4(),
      },
    });
    if (state.resetOnUpload) {
      handleDispatch({
        type: "RESET_STAGE_DATA",
      });
    }
  };

  const handleClickCheckbox = () => {
    handleDispatch({
      type: "UPDATE_RESET_ON_UPLOAD",
    });
  };

  return (
    <Stack
      direction={"column"}
      fullWidth
      height={"100%"}
      style={{
        overflow: "visible",
      }}
    >
      <SelectFile state={state} handleDispatch={handleDispatch} />
      <SelectFileType state={state} handleDispatch={handleDispatch} />
      <LanguageSelect state={state} handleDispatch={handleDispatch} />
      <ServerSelect state={state} handleDispatch={handleDispatch} />
      <Upload
        state={state}
        handleClickCheckbox={handleClickCheckbox}
        handleClickUpload={handleClickUpload}
      />
    </Stack>
  );
};

export default InputArea;
