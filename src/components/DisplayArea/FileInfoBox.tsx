import { UploadData } from "@/AppReducer";
import Stack from "../Stack";

type Props = {
  data?: UploadData;
};

const FileInfoBox = (props: Props) => {
  const { data } = props;
  return (
    <Stack direction={"column"} padding={4} wrap={"wrap"}>
      <div>파일 타입 : {data?.type}</div>
      <div>파일 언어 : {data?.language}</div>
      <div>타겟 서버 : {data?.region}</div>
    </Stack>
  );
};

export default FileInfoBox;
