import styled from "@emotion/styled";
import Stack from "../Stack";

const HeaderButton = styled("div")<{ width?: React.CSSProperties["width"] }>(
  ({ width }) => ({
    userSelect: "none",
    borderRadius: 4,
    minWidth: 32,
    width: width ? width : "100%",
    height: 24,
    textAlign: "center",
    backgroundColor: "#7a7a7a",
    ":hover": {
      backgroundColor: "#3d3d3d",
    },
    cursor: "pointer",
  }),
);

const Header = () => {
  console.log("# ", location.pathname);
  //
  return (
    <Stack
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        height: 48,
        justifyContent: "space-between",
        alignItems: "center",
        margin: 8,
      }}
    >
      <Stack
        style={{
          userSelect: "none",
          textDecoration: "none",
          color: "#fff",
          padding: 8,
          cursor: "pointer",
        }}
        onClick={() => {
          console.log(" >> click ");
        }}
      >
        <img src={"vite.svg"} draggable={false} />
      </Stack>
      <Stack
        direction={"row"}
        alignItems={"center"}
        width={"20%"}
        style={{
          padding: 8,
          justifyContent: "space-between",
        }}
      >
        <HeaderButton
          width={56}
          onClick={() => {
            //
          }}
        >
          test
        </HeaderButton>
        <HeaderButton
          width={56}
          onClick={() => {
            //
          }}
        >
          test2
        </HeaderButton>
        <HeaderButton
          width={56}
          onClick={() => {
            //
          }}
        >
          test3
        </HeaderButton>
      </Stack>
    </Stack>
  );
};

export default Header;
