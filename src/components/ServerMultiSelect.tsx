import { Region } from "@/AppReducer";
import styled from "@emotion/styled";
import { useState } from "react";

const StyledSelect = styled("div")({
  position: "relative",
  cursor: "pointer",
  height: 28,
  width: 200,
  fontSize: 14,
  color: "#fff",
  backgroundColor: "#292929",
  border: "1px solid #E9E9E9",
  borderRadius: 4,
  padding: 4,
});
const StyledP = styled("p")({
  margin: 2,
  padding: 0,
  paddingLeft: 4,
  fontSize: 12,
  maxWidth: 170,
  height: 24,
  overflow: "hidden",
});

const StyledUl = styled("ul")({
  zIndex: 100,
  listStyle: "none",
  position: "absolute",
  top: -208,
  left: 0,
  margin: 0,
  padding: 0,
  width: 208,
  maxHeight: 200,
  fontSize: 14,
  color: "#fff",
  backgroundColor: "#292929",
  border: "1px solid #E9E9E9",
  borderRadius: 4,
  overflow: "auto",
});
const StyledLi = styled("li")({
  padding: 6,
  cursor: "pointer",
  borderBottom: "1px solid #E9E9E9",
  "&:last-child": {
    borderBottom: "unset",
  },
  "&:hover": {
    backgroundColor: "#4d4d4d",
  },
});

const StyledArrowDown = styled("div")({
  position: "absolute",
  top: 16,
  right: 16,
  width: 0,
  height: 0,
  borderLeft: "4px solid transparent",
  borderRight: "4px solid transparent",
  borderTop: "4px solid #fff",
});

type Props = {
  list: Region[];
  value: Region[];
  onChange: (value: Region[], click: Region) => void;
};

const ServerMultiSelect = (props: Props) => {
  const { list, value, onChange } = props;
  const [open, setOpen] = useState<boolean>(false);
  //

  const handleChangeSelect = () => {
    setOpen(!open);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setOpen(false);
  };

  return (
    <StyledSelect onClick={handleChangeSelect} onBlur={handleBlur} tabIndex={1}>
      <StyledP>{value?.length ? value[0] : "선택 해 (주세요)"}</StyledP>
      {open && (
        <StyledUl>
          {list.map(item => {
            return (
              <StyledLi key={item} onClick={() => onChange(value, item)}>
                {item}
              </StyledLi>
            );
          })}
        </StyledUl>
      )}
      <StyledArrowDown />
    </StyledSelect>
  );
};

export default ServerMultiSelect;
