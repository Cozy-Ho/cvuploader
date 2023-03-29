import { Action, State, UploadFileList, UploadFileType } from "@/AppReducer";
import Stack from "../Stack";
import { ScalarStage } from "./type";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
  handleChangeStage: (stage: ScalarStage) => void;
};

const SelectFileType = (props: Props) => {
  const { state, handleDispatch, handleChangeStage } = props;

  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(" >> e.target.value ", e.target.value);
    handleDispatch({
      type: "UPDATE_STAGE_DATA",
      data: {
        ...state.stageData,
        type: e.target.value as UploadFileType,
      },
    });
    handleChangeStage("language");
  };

  return (
    <Stack
      fullWidth
      padding={8}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <select
        name="fileType"
        id="fileType"
        defaultValue={null}
        style={{
          appearance: "none",
          cursor: "pointer",
          height: 40,
          width: "50%",
          fontSize: 14,
          color: "#fff",
          backgroundColor: "#292929",
          border: "1px solid #E9E9E9",
          borderRadius: 4,
          padding: 8,
        }}
        onChange={handleChangeSelect}
      >
        <option value={""} disabled selected>
          {"파일 타입을 선택해주세요."}
        </option>
        {Object.keys(UploadFileList).map(key => {
          return (
            <option key={key} value={key}>
              {UploadFileList[key]}
            </option>
          );
        })}
      </select>
    </Stack>
  );
};

export default SelectFileType;
