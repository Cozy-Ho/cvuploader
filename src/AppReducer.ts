type Language = "en" | "eg" | "ru" | "vn";

const UploadFileList = {
  installation: "installation (설치프로그램)",
  smtp: "smtp (SMTP 설정)",
  manager_smtp: "manager smtp (매니저 SMTP 설정)",
  clever: "Clever (유저 매뉴얼)",
  cyber_lotus: "cyberLotus (Zalo)",
  viewer: "viewer (뷰어)",
  zalo: "zalo (Zalo)",
  termination_agreement: "termination_agreement (해지약관)",
  open_source_software_license: "open_source_license (오픈소스 라이센스)",
  terms_of_use: "이용약관",
  application_form: "이용신청서",
  processing_of_personal_information_policy: "개인정보 처리방침",
  personal_information_collection_and_usage_agreement:
    "개인정보 수집, 이용동의서 (병원용)",
  collect_and_use_personal_data_for_staff: "개인정보 수집, 이용동이서 (직원용)",
  consignment_of_personal_information_collected: "개인정보 처리 위탁 계약서",
} as const;

type UploadFileType = keyof typeof UploadFileList;

type UploadData = {
  id: string;
  file: File;
  region: string;
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

export type { UploadData, UploadFileType, Language, State, Action };
export { UploadFileList, reducer, INIT_STATE };
