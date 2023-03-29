type Language = "en" | "eg" | "ru" | "vn";
type Region =
  | "all"
  | "Egypt"
  | "Egypt-QA"
  | "Vietnam"
  | "Vietnam-QA"
  | "Russia"
  | "Russia-QA"
  | "develop";

type UploadFileType = {
  key: string;
  value: string;
};

const UploadFileList = [
  { key: "installation", value: "installation (설치프로그램)" },
  { key: "smtp", value: "smtp (SMTP 설정)" },
  { key: "manager_smtp", value: "manager smtp (매니저 SMTP 설정)" },
  { key: "clever", value: "Clever (유저 매뉴얼)" },
  { key: "cyber_lotus", value: "cyberLotus (Zalo)" },
  { key: "viewer", value: "viewer (뷰어)" },
  { key: "zalo", value: "zalo (Zalo)" },
  { key: "termination_agreement", value: "termination_agreement (해지약관)" },
  {
    key: "open_source_software_license",
    value: "open_source_license (오픈소스 라이센스)",
  },
  { key: "terms_of_use", value: "이용약관" },
  { key: "application_form", value: "이용신청서" },
  {
    key: "processing_of_personal_information_policy",
    value: "개인정보 처리방침",
  },
  {
    key: "personal_information_collection_and_usage_agreement",
    value: "개인정보 수집, 이용동의서 (병원용)",
  },
  {
    key: "collect_and_use_personal_data_for_staff",
    value: "개인정보 수집, 이용동이서 (직원용)",
  },
  {
    key: "consignment_of_personal_information_collected",
    value: "개인정보 처리 위탁 계약서",
  },
];

type UploadFileKey = typeof UploadFileList[number]["key"];

type UploadData = {
  id: string;
  file: File;
  region: Region[];
  language: Language;
  type: UploadFileType;
};

type State = {
  uploadData: UploadData[];
  stageData: UploadData | null;
};

type Action =
  | { type: "INIT"; data?: State }
  | { type: "ADD_UPLOAD_DATA"; data: UploadData }
  | { type: "UPDATE_STAGE_DATA"; data: UploadData }
  | { type: "REMOVE_UPLOAD_DATA"; id: string }
  | { type: "REMOVE_ALL_UPLOAD_DATA" };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT":
      return { ...state };
    case "ADD_UPLOAD_DATA":
      return { ...state, uploadData: [...state.uploadData, action.data] };
    case "UPDATE_STAGE_DATA":
      return { ...state, stageData: action.data };
    case "REMOVE_UPLOAD_DATA":
      return {
        ...state,
        uploadData: state.uploadData.filter(data => data.id !== action.id),
      };
    case "REMOVE_ALL_UPLOAD_DATA":
      return { ...state, uploadData: [] };
  }
};

const INIT_STATE = {
  uploadData: [],
  stageData: null,
};

export type { UploadData, UploadFileType, Language, State, Action, Region };
export { UploadFileList, reducer, INIT_STATE };
