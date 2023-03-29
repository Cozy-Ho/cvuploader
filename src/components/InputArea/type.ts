const Stage = ["fileUpload", "region", "language", "fileType"] as const;
type ScalarStage = typeof Stage[number];

type StageInfo = {
  prev: ScalarStage | null;
  current: ScalarStage | null;
  next: ScalarStage | null;
};

export type { ScalarStage, StageInfo };
