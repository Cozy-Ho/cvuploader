import { useRef, useState } from "react";
import Stack from "../Common/Stack";
import { Action, State } from "@/AppReducer";

type ValidateResult = {
  isError: boolean;
  message?: string;
};

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const ACCEPT_FILE_TYPE = [".pdf", ".xls", ".xlsx"];

const SelectFile = (props: Props) => {
  const { state, handleDispatch } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const { stageData } = state;

  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (input: FileList): ValidateResult => {
    if (input.length > 1) {
      return { isError: true, message: "파일은 하나씩!" };
    }
    if (!ACCEPT_FILE_TYPE.some(v => !input[0].name.includes(v))) {
      return { isError: true, message: "PDF or xlsx 파일만!" };
    }
    return { isError: false };
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    //
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    //
    const files = e.dataTransfer.files;
    const validate = validateFiles(files);
    if (validate.isError) {
      if (validate.message) {
        alert(validate.message);
        return;
      }
      alert("파일 에러!");
      return;
    }
    setIsDragging(false);
    handleDispatch({
      type: "UPDATE_STAGE_DATA",
      data: {
        ...stageData,
        file: e.dataTransfer.files[0],
      },
    });
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    //
    const validate = validateFiles(e.target.files);
    if (validate.isError) {
      if (validate.message) {
        alert(validate.message);
        return;
      }
      alert("파일 에러!");
      return;
    }
    console.log("# check : ", e.target.files);
    if (e.target.files.length) {
      // const inputFile = e.target.files[0];
      handleDispatch({
        type: "UPDATE_STAGE_DATA",
        data: {
          ...stageData,
          file: e.target.files[0],
        },
      });
    }
  };

  return (
    <Stack
      height={"45%"}
      justifyContent={"center"}
      alignItems={"center"}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={() => {
        console.log("Drag Enter");
        setIsDragging(true);
      }}
      onDragLeave={() => {
        console.log("Drag Leave");
        setIsDragging(false);
      }}
      onClick={handleClick}
      style={{
        border: `2px dashed #adadad`,
        borderRadius: `16px`,
        cursor: "pointer",
        margin: 16,
      }}
    >
      {isDragging ? (
        <p
          style={{
            userSelect: "none",
            zIndex: -1,
          }}
        >
          {">> 드롭 <<"}
        </p>
      ) : (
        <>
          {stageData?.file ? (
            <Stack>
              <div>{`${stageData?.file.name}`}</div>
            </Stack>
          ) : (
            <p
              style={{
                userSelect: "none",
                zIndex: -1,
              }}
            >
              {">> 파일 드래그 / 클릭 <<"}
            </p>
          )}
        </>
      )}
      <input
        ref={inputRef}
        accept={ACCEPT_FILE_TYPE.join(", ")}
        hidden={true}
        type={"file"}
        multiple={false}
        onChange={handleChangeFile}
      />
    </Stack>
  );
};

export default SelectFile;
