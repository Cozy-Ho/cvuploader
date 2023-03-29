import { Action, State } from "@/AppReducer";
import Stack from "../Stack";
import SelectFileType from "./SelectFileType";
import LanguageSelect from "./LanguageSelect";
import SelectFile from "./SelectFile";
import ServerSelect from "./ServerSelect";
import styled from "@emotion/styled";

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
        padding={8}
        style={{
          marginTop: 16,
        }}
      >
        <StyledButton>{"Upload"}</StyledButton>
      </Stack>
    </Stack>
  );
};

export default InputArea;
