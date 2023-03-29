import { Action, State } from "@/AppReducer";
import { ContentsBox, InputArea, Stack } from "@/components";
import DisplayArea from "../DisplayArea";
import Divider from "../Divider";

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
        <Stack width={"45%"} fullHeight>
          <InputArea state={state} handleDispatch={handleDispatch} />
        </Stack>
        <Divider direction={"column"} />
        <Stack width={"55%"} fullHeight>
          <DisplayArea state={state} />
        </Stack>
      </Stack>
    </ContentsBox>
  );
};
export default Main;
