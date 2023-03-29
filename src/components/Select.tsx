import { UploadFileType } from "@/AppReducer";
import styled from "@emotion/styled";
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
});

const StyledUl = styled("ul")<{ placement?: "top" | "bottom" }>(
  ({ placement = "bottom" }) => ({
    zIndex: 100,
    listStyle: "none",
    position: "absolute",
    top: placement === "bottom" ? 40 : -208,
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
  }),
);

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

const StyledP = styled("p")({
  margin: 2,
  padding: 0,
  paddingLeft: 4,
  fontSize: 12,
  maxWidth: 170,
  height: 24,
  overflow: "hidden",
});

interface Props<T> {
  data: T[];
  value?: T;
  placement?: "top" | "bottom";
  onChange: (data: string) => void;
}

export type SelectType = {
  key: string;
  value: string;
};

const Select = <T extends SelectType>(props: Props<T>) => {
  const { data, value, placement = "bottom", onChange } = props;
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    });

    return () => {
      window.removeEventListener("keydown", e => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      });
    };
  }, []);

  //
  const handleChangeSelect = () => {
    setOpen(!open);
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    setOpen(false);
  };

  return (
    <StyledSelect onClick={handleChangeSelect} onBlur={handleBlur} tabIndex={1}>
      <StyledP>{value ? value.value : data[0].value}</StyledP>
      {open && (
        <StyledUl placement={placement}>
          {data.map(item => {
            return (
              <StyledLi
                key={item.key}
                value={item.value}
                onClick={() => {
                  onChange(item.key);
                }}
              >
                {item.value}
              </StyledLi>
            );
          })}
        </StyledUl>
      )}
      <StyledArrowDown />
    </StyledSelect>
  );
};

export default Select;
