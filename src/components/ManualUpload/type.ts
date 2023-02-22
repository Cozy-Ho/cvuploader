/**
 * Sequence
 * 1. fileUpload
 * 2. region
 * 3. language
 * 4. type
 */
const Stage = ["fileUpload", "region", "language", "fileType"] as const;
type ScalarStage = typeof Stage[number];

type StageInfo = {
  prev: ScalarStage | null;
  current: ScalarStage | null;
  next: ScalarStage | null;
};

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

export type { ScalarStage, StageInfo };
export { StageList };
