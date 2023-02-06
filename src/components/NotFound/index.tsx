import { useLocation } from "react-router-dom";

const NotFound = () => {
  //
  const location = useLocation();

  return (
    <>
      <div>Page not found.</div>
      <div>Current location is {location.pathname}</div>
    </>
  );
};

export default NotFound;
