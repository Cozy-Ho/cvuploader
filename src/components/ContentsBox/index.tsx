import styled from "@emotion/styled";
import Stack from "../Common/Stack";
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
  width: width ? width : 900,
  height: height ? height : 600,
  justifyContent: justifyContent,
  alignItems: alignItems,
  marginTop: 48,
  border: `1px solid #fff`,
  borderRadius: 16,
}));

export default ContentsBox;
