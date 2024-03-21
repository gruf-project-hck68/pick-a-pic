import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";


const NavbarStart = () => {
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const text = theme[currentTheme].text;
  return (
    <>
      <div className="navbar-start">

        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-info"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link to={"/collections"} className="font-poppins text-lg text-info">Collection</Link>
            </li>
            <li>
              <Link to="/my-collections" className="font-poppins text-lg text-info">
                My Collection
              </Link>
            </li>
          </ul>
        </div>
        <Link to={"/home"} className={`font-poppins text-2xl font-semibold ${text} lg:ms-5`}>
          Pick a pict
        </Link>
      </div>
    </>
  );
};

const NavbarCenter = () => {
  return (
    <>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2">
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </div>
    </>
  );
};

const NavbarEnd = () => {
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const text = theme[currentTheme].text;
  const bgColor = theme[currentTheme].bgColor;
  return (
    <>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          defaultValue=""
          defaultChecked=""
          className="peer sr-only"
          onChange={() => {
            setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
          }}
        />
        <div className="after: peer flex h-8 items-center gap-4 rounded-full bg-orange-600 px-3 text-sm text-white after:absolute after:left-1 after:h-6 after:w-12 after:rounded-full after:bg-white/40 after:transition-all after:content-[''] peer-checked:bg-stone-600 peer-checked:after:translate-x-full peer-focus:outline-none dark:border-slate-600 dark:bg-slate-700">
          <span>Dark</span>
          <span>Light</span>
        </div>
      </label>
      <div className="navbar-end flex gap-5">
        <Link
          to="/collections"
          className={`hidden font-poppins text-xl font-semibold ${text} md:block`}
        >
          Collection
        </Link>
        <Link
          to="/my-collections"
          className={`hidden font-poppins text-xl font-semibold ${text} md:block`}
        >
          My Collection
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost me-3 object-cover lg:me-5"
          >
            <div className="w-12 rounded-full">
              <img
                className="w-12 object-cover"
                alt={localStorage.displayName ? localStorage.displayName : "NoName"}
                src={localStorage.photoURL ? localStorage.photoURL : "https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className={`menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box ${bgColor} p-2 shadow`}
          >
            <li>
              <Link
                to="/my-profile"
                className={`justify-between font-poppins text-lg ${text}`}
              >
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <Link to="/logout" className={`font-poppins text-lg ${text}`}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default function Navbar() {
  const { theme, currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const bgColor = theme[currentTheme].bgColor;
  const navBorder = theme[currentTheme].navBorder;
  return (
    <div
      className={`navbar sticky top-0 z-40 border-b ${navBorder} ${bgColor}`}
    >
      <NavbarStart />
      {/* <NavbarCenter /> */}
      <NavbarEnd />
    </div>
  );
}
