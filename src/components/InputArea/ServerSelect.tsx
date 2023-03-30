import { Action, Region, State } from "@/AppReducer";
import Stack from "../Stack";
import Select, { SelectType } from "../Select";
import ServerMultiSelect from "../ServerMultiSelect";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const SERVER_LIST: Region[] = [
  "Egypt",
  "Egypt-QA",
  "Vietnam",
  "Vietnam-QA",
  "Russia",
  "Russia-QA",
  "develop",
];

const ServerSelect = (props: Props) => {
  const { state, handleDispatch } = props;
  //
  const handleOnChange = (value: Region[]) => {
    handleDispatch({
      type: "UPDATE_STAGE_DATA",
      data: {
        ...state.stageData,
        region: value,
      },
    });
  };
  return (
    <Stack padding={16} justifyContent={"space-between"} alignItems={"center"}>
      <div>{"Server"}</div>
      <ServerMultiSelect
        list={SERVER_LIST}
        value={state.stageData?.region}
        onChange={handleOnChange}
      />
    </Stack>
  );
};

export default ServerSelect;
