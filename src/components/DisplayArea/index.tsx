import { State } from "@/AppReducer";
import Stack from "../Stack";
import styled from "@emotion/styled";
import FileInfoBox from "./FileInfoBox";
import Divider from "../Divider";

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
  padding: 2,
  marginTop: 4,
  marginBottom: 4,
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
      padding={8}
      style={{
        overflowY: "scroll",
      }}
    >
      <div style={{ fontSize: 12 }}>{"# 현재 업로드 준비중"}</div>
      <StyledDiv>
        <FileInfoBox data={stageData} />
      </StyledDiv>
      <Divider
        direction={"row"}
        style={{
          margin: "16px 0",
        }}
      />
      <div style={{ fontSize: 12 }}>{`# 업로드 대기열 `}</div>
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
