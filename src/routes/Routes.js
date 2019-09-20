import React from "react";

import RotatingTabPage from './../pages/RotatingTab.jsx';
import TestIFramePage from './../pages/TestIFrame.jsx';

const routes = (initialState, reducer, state) => {
  return {
    "/": () => <RotatingTabPage initialState={initialState} reducer={reducer} state={state}/>,
    "/testiframe": () => <TestIFramePage />,
    "/:id": ({id}) => <RotatingTabPage initialState={initialState} reducer={reducer} id={id} />
  }
};

export default routes;
