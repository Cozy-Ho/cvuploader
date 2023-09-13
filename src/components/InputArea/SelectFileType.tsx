import { Action, State, UploadFileList, UploadFileType } from "@/AppReducer";
import Select from "../Select";
import Stack from "../Common/Stack";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const SelectFileType = (props: Props) => {
  const { state, handleDispatch } = props;

  const handleChangeSelect = (data: string) => {
    console.log(" >> e.target.value ", data);
    handleDispatch({
      type: "UPDATE_STAGE_DATA",
      data: {
        ...state.stageData,
        type: UploadFileList.find(item => item.key === data),
      },
    });
  };

  return (
    <Stack padding={16} justifyContent={"space-between"} alignItems={"center"}>
      <div>{"Upload to"}</div>
      <Select<UploadFileType>
        data={UploadFileList}
        onChange={handleChangeSelect}
        value={state.stageData?.type}
      />
    </Stack>
  );
};

export default SelectFileType;
