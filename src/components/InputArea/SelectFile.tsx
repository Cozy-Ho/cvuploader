import { useRef, useState } from "react";
import Stack from "../Stack";
import { Action, State } from "@/AppReducer";

type Props = {
  state: State;
  handleDispatch: (action: Action) => void;
};

const SelectFile = (props: Props) => {
  const { state, handleDispatch } = props;
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const validateFiles = (input: FileList): boolean => {
    if (input.length > 1) {
      return false;
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    //
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    //
    console.log("드랍!", e.dataTransfer.files);
    const files = e.dataTransfer.files;
    setIsDragging(false);
    if (files.length > 1) {
      alert(`파일은 하나씩 !`);
      return;
    }
    handleDispatch({
      type: "UPDATE_STAGE_DATA",
      data: {
        ...state.stageData,
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
    if (e.target.files.length) {
      // const inputFile = e.target.files[0];
      handleDispatch({
        type: "UPDATE_STAGE_DATA",
        data: {
          ...state.stageData,
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
        <p
          style={{
            userSelect: "none",
            zIndex: -1,
          }}
        >
          {">> 파일 드래그 / 클릭 <<"}
        </p>
      )}
      <input
        ref={inputRef}
        accept={".pdf"}
        hidden={true}
        type={"file"}
        multiple={false}
        onChange={handleChangeFile}
      />
    </Stack>
  );
};

export default SelectFile;
