import styled from "@emotion/styled";
import { Stack } from "@/components";
import { shouldForwardProp } from "@/utils/emotion";

interface ContentsBoxProps {
  height?: React.CSSProperties["height"];
  width?: React.CSSProperties["width"];
  alignItems?: React.CSSProperties["alignItems"];
  justifyContent?: React.CSSProperties["justifyContent"];
}

const ContentsBox = styled(Stack, {
  shouldForwardProp: shouldForwardProp([]),
})<ContentsBoxProps>(({ width, height, justifyContent, alignItems }) => ({
  width: width ? width : 700,
  height: height ? height : 500,
  justifyContent: justifyContent,
  alignItems: alignItems,
  marginTop: 48,
  border: `1px solid #fff`,
  borderRadius: 16,
}));

export default ContentsBox;
