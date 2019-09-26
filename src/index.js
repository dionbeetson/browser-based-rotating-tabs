import React, {useContext, useReducer} from "react";
import ReactDOM from "react-dom";
import { useRoutes } from "hookrouter";

import { StateProvider, StateContext } from './state/State.js';
import routes from "./routes/Routes";

try {
function App() {
  return (
    <StateProvider>
      {useRoutes(routes())}
    </StateProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
}catch(e) {
  alert(e)
}
