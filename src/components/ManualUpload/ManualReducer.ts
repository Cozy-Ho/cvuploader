import { StageInfo } from "./type";

interface ManualState {
  curStage: StageInfo;
  targetFile: File | null;
}

const INIT_MANUAL_STATE: ManualState = {
  curStage: {
    prev: null,
    current: "fileUpload",
    next: "region",
  },
  targetFile: null,
};

type ManualAction =
  | { type: "INIT"; data?: ManualState }
  | { type: "UPDATE_CUR_STAGE"; inputStage: StageInfo }
  | { type: "UPDATE_TARGET_FILE"; inputFile: File | null };

const reducer = (state: ManualState, action: ManualAction): ManualState => {
  switch (action.type) {
    case "INIT":
      return { ...state };
    case "UPDATE_CUR_STAGE":
      return { ...state, curStage: action.inputStage };
    case "UPDATE_TARGET_FILE":
      return { ...state, targetFile: action.inputFile };
  }
};
export { reducer, INIT_MANUAL_STATE };
export type { ManualState, ManualAction };
