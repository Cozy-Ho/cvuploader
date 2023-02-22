import { useRef, useState } from "react";
import Stack from "../Stack";

const SelectFile = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [stageFile, setStageFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

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
    }
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
      setStageFile(e.target.files[0]);
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
        hidden={true}
        type={"file"}
        multiple={false}
        onChange={handleChangeFile}
      />
    </Stack>
  );
};

export default SelectFile;
