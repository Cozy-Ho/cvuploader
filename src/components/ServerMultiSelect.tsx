import { Region } from "@/AppReducer";
import styled from "@emotion/styled";
import { produce } from "immer";
import { useEffect, useState } from "react";

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
  wordBreak: "break-all",
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
  top: -358,
  right: 0,
  margin: 0,
  padding: 0,
  width: 300,
  height: 400,
  fontSize: 14,
  color: "#fff",
  backgroundColor: "#292929",
  border: "1px solid #E9E9E9",
  borderRadius: 4,
  overflow: "auto",
});

const StyledLi = styled("div")({
  display: "flex",
  justifyContent: "fle-start",
  alignContent: "center",
  padding: 6,
  cursor: "pointer",
  borderBottom: "1px solid #E9E9E9",
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

const ApplyButton = styled("button")({
  backgroundColor: "#a3a3a3",
  position: "absolute",
  bottom: 16,
  right: 16,
  color: "white",
  padding: 8,
  borderRadius: 4,
  border: "none",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#4d4d4d",
  },
});

// styled checkbox compoenent
const StyledCheckbox = styled("input")({
  position: "absolute",
  opacity: 0,
  cursor: "pointer",
  height: 0,
  width: 0,
  "&:checked ~ span": {
    backgroundColor: "#4d4d4d",
  },
  "&:checked ~ span:after": {
    display: "block",
  },
});

const StyledCheckmark = styled("span")({
  position: "absolute",
  top: 4,
  left: 4,
  height: 16,
  width: 16,
  backgroundColor: "#a3a3a3",
  borderRadius: 4,
  "&:after": {
    content: '""',
    position: "absolute",
    display: "none",
    left: 5,
    top: 2,
    width: 4,
    height: 8,
    border: "solid white",
    borderWidth: "0 2px 2px 0",
    transform: "rotate(45deg)",
  },
});

type Props = {
  list: Region[];
  value: Region[];
  onChange: (value: Region[]) => void;
};

const ServerMultiSelect = (props: Props) => {
  const { list, value, onChange } = props;
  const [open, setOpen] = useState<boolean>(false);
  //

  const [selected, setSelected] = useState<Region[]>(value || []);

  useEffect(() => {
    if (open) {
      setSelected(value || []);
    }
  }, [open, value]);

  const handleMouseDown = () => {
    setOpen(!open);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setOpen(false);
  };

  const handleClickApply = () => {
    console.log("# click apply!", selected);
    onChange(selected);
    setOpen(false);
  };

  const handleClickItem = (item: Region) => {
    setSelected(
      produce(selected, draft => {
        if (item === "all") {
          console.log(draft.length, list.length);
          if (draft.length === list.length) {
            draft.splice(0, draft.length);
          } else {
            draft.splice(0, draft.length, ...list);
          }
          return;
        }

        if (draft.includes(item)) {
          const index = draft.indexOf(item);
          draft.splice(index, 1);
        } else {
          draft.push(item);
        }
      }),
    );
  };

  return (
    <StyledSelect onClick={handleMouseDown} onBlur={handleBlur} tabIndex={1}>
      <StyledP>{value?.length ? value.join(", ") : "선택 해 (주세요)"}</StyledP>
      {open && (
        <StyledUl
          onClick={e => {
            e.stopPropagation();
          }}
          onMouseDown={e => {
            e.stopPropagation();
            // handleMouseDown();
          }}
        >
          <>
            <StyledLi onClick={() => handleClickItem("all")}>
              <div
                style={{
                  position: "relative",
                  width: 16,
                  height: 16,
                }}
              >
                <StyledCheckbox
                  readOnly
                  type={"checkbox"}
                  checked={selected.length === list.length}
                />
                <StyledCheckmark />
              </div>
              <div
                style={{
                  paddingLeft: 8,
                }}
              >
                {"All"}
              </div>
            </StyledLi>
            {list.map(item => {
              return (
                <StyledLi key={item} onClick={() => handleClickItem(item)}>
                  <div
                    style={{
                      position: "relative",
                      width: 16,
                      height: 16,
                    }}
                  >
                    <StyledCheckbox
                      readOnly
                      type={"checkbox"}
                      checked={selected.includes(item)}
                    />
                    <StyledCheckmark />
                  </div>
                  <div
                    style={{
                      paddingLeft: 8,
                    }}
                  >
                    {item}
                  </div>
                </StyledLi>
              );
            })}
            <ApplyButton onMouseDown={handleClickApply}>Apply</ApplyButton>
          </>
        </StyledUl>
      )}
      <StyledArrowDown />
    </StyledSelect>
  );
};

export default ServerMultiSelect;
