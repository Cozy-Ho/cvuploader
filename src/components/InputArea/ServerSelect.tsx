import { Action, Region, State } from "@/AppReducer";
import ServerMultiSelect from "../ServerMultiSelect";
import Stack from "../Stack";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const SERVER_LIST: Region[] = [
  "Egypt",
  "Egy",
  "Egypt-QA",
  "Vietnam",
  "Vietnam-QA",
  "Russia",
  "Russia-QA",
  "Develop",
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
