import { UploadData } from "@/AppReducer";
import Stack from "../Common/Stack";
import { v4 } from "uuid";
import { useEffect, useRef, useState } from "react";

const { ipcRenderer } = window.require("electron");

type Props = {
  data: UploadData;
};

const FileInfoBox = (props: Props) => {
  const { data } = props;

  const uploadId = useRef<string>(v4());
  const [uploadStatus, setUploadStatus] = useState<
    "pending" | "success" | "fail"
  >("pending");
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (!uploadId.current) return;

    console.log("check id", uploadId.current);
    setUploadStatus("pending");
    ipcRenderer.send("upload-file", {
      id: uploadId.current,
      file: data.file.path,
      extension: data.file.name.split(".").pop(),
      type: data.type.key,
      lang: data.language,
      region: data.region,
    });

    ipcRenderer.on(
      `upload-done-${uploadId.current}`,
      (event: any, arg: any) => {
        setUploadStatus("success");
        console.log("upload success");
      },
    );
    ipcRenderer.on(
      `upload-fail-${uploadId.current}`,
      (event: any, arg: any) => {
        setUploadStatus("fail");
        console.log("upload failed");
      },
    );

    return () => {
      ipcRenderer.removeAllListeners("upload-done");
      ipcRenderer.removeAllListeners("upload-faile");
    };
  }, [setUploadStatus, uploadId.current]);

  return (
    <>
      {uploadStatus === "pending" && (
        <Stack direction={"column"} padding={4} wrap={"wrap"}>
          {"업로드 중"}
        </Stack>
      )}
      {uploadStatus === "success" && (
        <Stack direction={"column"} padding={4} wrap={"wrap"}>
          <div>{`파일 이름 :  ${data.file.name}`}</div>
          <div>{`파일 타입 :  ${data.type.value}`}</div>
          <div>{`파일 언어 :  ${data.language}`}</div>
          <div>{`타겟 서버 :  ${data.region}`}</div>
        </Stack>
      )}
      {uploadStatus === "fail" && (
        <Stack direction={"column"} padding={4} wrap={"wrap"}>
          {"업로드 실패"}
        </Stack>
      )}
    </>
  );
};

export default FileInfoBox;
