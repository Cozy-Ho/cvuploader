import { ScalarStage, StageInfo } from "./type";

interface ManualState {
  curStage: StageInfo;
  targetFile: File | null;
}

/**
 * Sequence
 * 1. fileUpload
 * 2. region
 * 3. language
 * 4. type
 */
const StageList: {
  [key in ScalarStage]: StageInfo;
} = {
  fileUpload: {
    prev: null,
    current: "fileUpload",
    next: "region",
  },
  region: {
    prev: "fileUpload",
    current: "region",
    next: "language",
  },
  language: {
    prev: "region",
    current: "language",
    next: "fileType",
  },
  fileType: {
    prev: "language",
    current: "fileType",
    next: null,
  },
};

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
export { reducer, INIT_MANUAL_STATE, StageList };
export type { ManualState, ManualAction };
