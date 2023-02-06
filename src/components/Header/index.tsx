import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  console.log("# ", location.pathname);
  //
  return (
    <>
      {location.pathname !== "/" && (
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
      )}
    </>
  );
};

export default Header;
