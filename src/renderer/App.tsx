import React from "react";

function App() {
  return (
    <React.Suspense fallback={<div>Loading... </div>}>
      <div>hello electron</div>
    </React.Suspense>
  );
}

export default App;
