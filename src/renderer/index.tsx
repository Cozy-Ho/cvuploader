import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = React.lazy(() => import("./App"));

ReactDOM.render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
  document.getElementById("root")
);
