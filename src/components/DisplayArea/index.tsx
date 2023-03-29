import { State } from "@/AppReducer";
import Stack from "../Stack";
import styled from "@emotion/styled";

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
        <Stack direction={"column"}>
          <div>type: {stageData?.type}</div>
          <div>language: {stageData?.language}</div>
          <div>region: {stageData?.region}</div>
        </Stack>
      </StyledDiv>
      <div
        style={{
          width: "100%",
          height: 1,
          backgroundColor: "#fff",
          margin: "16px 0",
        }}
      />
      <div style={{ fontSize: 12 }}>{`# 업로드 대기열 `}</div>
      {uploadData.map(item => {
        return (
          <StyledDiv key={item.id}>
            <Stack direction={"column"}>
              <div>type: {item.type}</div>
              <div>language: {item.language}</div>
              <div>region: {item.region}</div>
            </Stack>
          </StyledDiv>
        );
      })}
    </Stack>
  );
};

export default DisplayArea;
