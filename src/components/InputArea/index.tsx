import { Action, State } from "@/AppReducer";
import styled from "@emotion/styled";
import Stack from "../Stack";
import LanguageSelect from "./LanguageSelect";
import SelectFile from "./SelectFile";
import SelectFileType from "./SelectFileType";
import ServerSelect from "./ServerSelect";
import { v4 } from "uuid";

const StyledButton = styled("button")({
  backgroundColor: "#a3a3a3",
  color: "white",
  padding: 8,
  borderRadius: 4,
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#4d4d4d",
  },
});

const StyledCheckbox = styled("input")({
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  height: 0,
  width: 0,
  "&:checked ~ span": {
    backgroundColor: "#4d4d4d",
  },
  "&:checked ~ span:after": {
    display: "block",
  },
});

const StyledCheckmark = styled("span")({
  position: "absolute",
  top: 4,
  left: 4,
  height: 16,
  width: 16,
  backgroundColor: "#a3a3a3",
  borderRadius: 4,
  "&:after": {
    content: '""',
    position: "absolute",
    display: "none",
    left: 5,
    top: 2,
    width: 4,
    height: 8,
    border: "solid white",
    borderWidth: "0 2px 2px 0",
    transform: "rotate(45deg)",
  },
});

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
      <Stack
        justifyContent={"space-between"}
        style={{
          margin: 16,
        }}
      >
        <Stack fullWidth onClick={handleClickCheckbox}>
          <div
            style={{
              position: "relative",
              width: 32,
              height: 32,
            }}
          >
            <StyledCheckbox
              readOnly
              type={"checkbox"}
              checked={state.resetOnUpload}
              onChange={() => {}}
            />
            <StyledCheckmark />
          </div>
          <div>{"Reset on Upload"}</div>
        </Stack>
        <StyledButton onClick={handleClickUpload}>{"Upload"}</StyledButton>
      </Stack>
    </Stack>
  );
};

export default InputArea;
