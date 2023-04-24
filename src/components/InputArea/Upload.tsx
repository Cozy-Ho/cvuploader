import { State } from "@/AppReducer";
import Stack from "../Stack";
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

type UploadProps = {
  state: State;
  handleClickCheckbox: () => void;
  handleClickUpload: () => void;
};

const Upload = (props: UploadProps) => {
  const { state, handleClickCheckbox, handleClickUpload } = props;
  //
  return (
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
  );
};

export default Upload;
