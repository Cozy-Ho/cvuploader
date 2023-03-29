import { Action, Language, State } from "@/AppReducer";
import Stack from "../Stack";
import Select, { SelectType } from "../Select";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const LANGUAGE_LIST: SelectType[] = ["en", "eg", "ru", "vn"].map(item => {
  return {
    key: item,
    value: item,
  };
});

const LanguageSelect = (props: Props) => {
  const { state, handleDispatch } = props;
  //
  const handleChangeSelect = (data: string) => {
    console.log(" >> e.target.value ", data);
    handleDispatch({
      type: "UPDATE_STAGE_DATA",
      data: {
        ...state.stageData,
        language: data as Language,
      },
    });
  };

  return (
    <Stack padding={16} justifyContent={"space-between"} alignItems={"center"}>
      <div>{"Language"}</div>
      <Select<SelectType>
        data={LANGUAGE_LIST}
        onChange={handleChangeSelect}
        value={LANGUAGE_LIST.find(
          item => item.key === state.stageData?.language,
        )}
      />
    </Stack>
  );
};

export default LanguageSelect;
