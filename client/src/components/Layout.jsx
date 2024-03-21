import React, { useContext } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

export default function Layout() {
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgColor;
  const border = theme[currentTheme].border;
  return (
    <>
      <Navbar />
      <div className={`flex lg:min-h-full w-full ${bgColor}`}>
        <Outlet />
      </div>
    </>
  );
}
