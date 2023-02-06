import styled from "@emotion/styled";
import React, { memo } from "react";
import { shouldForwardProp } from "@/utils/emotion";

export interface StackProps {
  children: React.ReactNode;
  direction?: React.CSSProperties["flexDirection"];
  spacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  crossSpacing?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  wrap?: React.CSSProperties["flexWrap"];
  alignItems?: React.CSSProperties["alignItems"];
  justifyContent?: React.CSSProperties["justifyContent"];
  fullHeight?: boolean;
  fullWidth?: boolean;
  inline?: boolean;
  height?: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
  padding?: React.CSSProperties["padding"];
  shrink?: React.CSSProperties["flexShrink"];
  overflow?: React.CSSProperties["overflow"];
  backgroundColor?: React.CSSProperties["backgroundColor"];
  label?: string;
}

function getSpacing(
  spacing: number,
  crossSpacing: number,
  direction?: React.CSSProperties["flexDirection"],
) {
  if (!spacing) return;

  const space = spacing * 8;
  const crossSpace = crossSpacing * 8;

  if (direction === "column") {
    return {
      marginTop: -space,
      marginLeft: -crossSpace,
      [`> *`]: {
        marginTop: space,
        marginLeft: crossSpace,
      },
    };
  } else {
    return {
      marginTop: -crossSpace,
      marginLeft: -space,
      [`> *`]: {
        marginTop: crossSpace,
        marginLeft: space,
      },
    };
  }
}

const Stack = styled("div", {
  shouldForwardProp: shouldForwardProp([
    "direction",
    "fullHeight",
    "fullWidth",
    "alignItems",
    "justifyContent",
    "backgroundColor",
    "label",
    "crossSpacing",
    "inline",
  ]),
})<StackProps>(
  ({
    direction = "row",
    spacing = 0,
    crossSpacing = 0,
    wrap = "nowrap",
    alignItems,
    justifyContent,
    fullHeight,
    fullWidth,
    height,
    inline = false,
    padding = 0,
    shrink,
    overflow,
    backgroundColor,
    width,
    label,
  }) => ({
    display: inline ? "inline-flex" : "flex",
    flexDirection: direction,
    flexWrap: wrap,
    alignItems: alignItems,
    justifyContent: justifyContent,
    height: fullHeight ? "100%" : height ? height : undefined,
    width: fullWidth ? "100%" : width ? width : undefined,
    overflow: overflow ? overflow : fullHeight ? "hidden" : "none",
    padding: padding,
    flexShrink: shrink,
    backgroundColor,
    ...getSpacing(spacing, crossSpacing, direction),
    label,
  }),
);

export default memo(Stack);
