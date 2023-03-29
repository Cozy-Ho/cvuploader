import { Action, State } from "@/AppReducer";
import { ContentsBox, InputArea, Stack } from "@/components";
import DisplayArea from "../DisplayArea";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const Main = (props: Props) => {
  const { state, handleDispatch } = props;
  return (
    <ContentsBox justifyContent={"center"} alignItems={"center"}>
      <Stack
        direction={"row"}
        width={"100%"}
        height={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Stack width={"60%"} fullHeight>
          <InputArea state={state} handleDispatch={handleDispatch} />
        </Stack>
        <div
          style={{
            width: 1,
            height: "100%",
            backgroundColor: "#fff",
          }}
        />
        <Stack width={"40%"} fullHeight>
          <DisplayArea state={state} />
        </Stack>
      </Stack>
    </ContentsBox>
  );
};
export default Main;
