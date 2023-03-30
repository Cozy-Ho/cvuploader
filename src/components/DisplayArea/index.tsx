import { State } from "@/AppReducer";
import Stack from "../Stack";
import styled from "@emotion/styled";
import FileInfoBox from "./FileInfoBox";

type Props = {
  state: State;
};

const StyledDiv = styled("div")({
  width: "100%",
  fontSize: 14,
  color: "#fff",
  backgroundColor: "#292929",
  border: "1px solid #E9E9E9",
  borderRadius: 4,
  padding: 4,
  marginBottom: 8,
});

const DisplayArea = (props: Props) => {
  const { state } = props;

  const { uploadData, stageData } = state;

  return (
    <Stack
      direction={"column"}
      fullWidth
      justifyContent={"flex-start"}
      alignItems={"center"}
      padding={16}
      style={{
        overflowY: "scroll",
      }}
    >
      <div>{"Done # "}</div>
      {uploadData.length < 1 && (
        <Stack
          direction={"column"}
          fullHeight
          justifyContent={"center"}
          alignItems={"center"}
          padding={8}
        >
          {"텅텅"}
        </Stack>
      )}
      {uploadData.map(item => {
        return (
          <StyledDiv key={item.id}>
            <FileInfoBox data={item} />
          </StyledDiv>
        );
      })}
    </Stack>
  );
};

export default DisplayArea;
