import React from "react";

import RotatingTabPage from './../pages/RotatingTab.jsx';
import TestIFramePage from './../pages/TestIFrame.jsx';
import WelcomePage from './../pages/Welcome.jsx';

const routes = (initialState, reducer, state) => {
  return {
    "/": () => <RotatingTabPage initialState={initialState} reducer={reducer} state={state}/>,
    "/welcome": () => <WelcomePage />,
    "/testiframe": () => <TestIFramePage />,
    "/:id": ({id}) => <RotatingTabPage initialState={initialState} reducer={reducer} id={id} />
  }
};

export default routes;
