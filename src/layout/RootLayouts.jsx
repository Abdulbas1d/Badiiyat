import React from "react";
import { Outlet } from "react-router-dom";

function RootLayouts() {
  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayouts;
