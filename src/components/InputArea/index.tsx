import { Action, State } from "@/AppReducer";
import styled from "@emotion/styled";
import Stack from "../Stack";
import LanguageSelect from "./LanguageSelect";
import SelectFile from "./SelectFile";
import SelectFileType from "./SelectFileType";
import ServerSelect from "./ServerSelect";

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

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const InputArea = (props: Props) => {
  const { state, handleDispatch } = props;

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
        justifyContent={"flex-end"}
        style={{
          margin: 16,
        }}
      >
        <StyledButton>{"Upload"}</StyledButton>
      </Stack>
    </Stack>
  );
};

export default InputArea;
