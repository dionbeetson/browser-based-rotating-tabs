import React from "react";
import ReactDOM from "react-dom";
import { useRoutes } from "hookrouter";

import routes from "./routes/Routes";

function App() {
  return (
    <div>
      {useRoutes(routes)}
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
