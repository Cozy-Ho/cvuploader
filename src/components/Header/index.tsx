import { Link, useLocation } from "react-router-dom";
import Stack from "../Stack";

const Header = () => {
  const location = useLocation();
  console.log("# ", location.pathname);
  //
  return (
    <Stack>
      {location.pathname !== "/" && (
        <div
          style={{
            userSelect: "none",
          }}
        >
          <Link
            draggable={false}
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
            <img src={"vite.svg"} draggable={false} />
          </Link>
        </div>
      )}
    </Stack>
  );
};

export default Header;
