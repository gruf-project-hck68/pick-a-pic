import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";


export default function Layout() {
  return (
    <>
      <Navbar />
      <div className="flex lg:min-h-full w-full bg-primary">
        <Outlet />        
      </div>
    </>
  );
}
