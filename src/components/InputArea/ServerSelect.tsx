import { Action, State } from "@/AppReducer";
import Stack from "../Stack";
import Select, { SelectType } from "../Select";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const SERVER_LIST: SelectType[] = [
  "all",
  "Egypt",
  "Egypt-QA",
  "Vietnam",
  "Vietnam-QA",
  "Russia",
  "Russia-QA",
  "develop",
].map(item => ({
  key: item,
  value: item,
}));

const ServerSelect = (props: Props) => {
  const { state, handleDispatch } = props;
  //
  const handleOnChange = (data: string) => {
    console.log(" >> e.target.value ", data);
    handleDispatch({
      type: "UPDATE_STAGE_DATA",
      data: {
        ...state.stageData,
        region: data,
      },
    });
  };
  return (
    <Stack padding={16} justifyContent={"space-between"} alignItems={"center"}>
      <div>{"Server"}</div>
      <Select
        data={SERVER_LIST}
        placement={"top"}
        onChange={handleOnChange}
        value={SERVER_LIST.find(item => item.key === state.stageData?.region)}
      />
    </Stack>
  );
};

export default ServerSelect;
