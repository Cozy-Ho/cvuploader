import { useRef, useState } from "react";
import Stack from "../Stack";
import { ManualAction, ManualState, StageList } from "./ManualReducer";

type Props = {
  state: ManualState;
  handleDispatch: (action: ManualAction) => void;
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
      type: "UPDATE_TARGET_FILE",
      inputFile: e.dataTransfer.files[0],
    });
    handleDispatch({
      type: "UPDATE_CUR_STAGE",
      inputStage: StageList[state.curStage.next],
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
        type: "UPDATE_TARGET_FILE",
        inputFile: e.target.files[0],
      });
      handleDispatch({
        type: "UPDATE_CUR_STAGE",
        inputStage: StageList[state.curStage.next],
      });
    }
  };

  return (
    <Stack
      width={"85%"}
      height={"80%"}
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
        border: isDragging ? `4px dashed white` : `unset`,
        borderRadius: `16px`,
        cursor: "pointer",
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
