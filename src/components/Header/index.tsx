import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Stack from "../Stack";

const Header = () => {
  const location = useLocation();
  const [openMemo, setOpenMemo] = useState<boolean>(false);
  console.log("# ", location.pathname);
  //
  return (
    <Stack>
      {location.pathname !== "/" && (
        <div>
          <Link
            to={"/"}
            style={{
              textDecoration: "none",
              color: "#fff",
              position: "fixed",
              top: 32,
              left: 48,
              padding: 8,
            }}
          >
            <img src={"vite.svg"} />
          </Link>
          <button
            style={{
              position: "fixed",
              top: 32,
              left: 48 * 3,
              padding: 8,
            }}
            onClick={() => {
              setOpenMemo(prev => !prev);
            }}
          >
            {">> 메모 <<"}
          </button>
        </div>
      )}
      {openMemo && (
        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <p>하나의 파일을 한번에 여러곳 업로드</p>
          <p>다운로드 기능도 필요할듯? 확인용 으로</p>
          <p>미리보기 기능 있으면 좋을듯</p>
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
