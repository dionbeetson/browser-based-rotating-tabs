import React from "react";

import RotatingTabPage from './../pages/RotatingTab.jsx';
import TestIFramePage from './../pages/TestIFrame.jsx';

const routes = {
  "/": () => <RotatingTabPage />,
  "/testiframe": () => <TestIFramePage />,
  "/:id": () => <RotatingTabPage />
};

export default routes;
