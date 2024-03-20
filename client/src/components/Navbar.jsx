import React from "react";
import { Link, Outlet } from "react-router-dom";

const NavbarStart = () => {
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <li>
                <Link className="font-poppins text-lg text-info">
                  Collection
                </Link>
              </li>
            </li>
            <li>
              <li>
                <Link className="font-poppins text-lg text-info">
                  My Collection
                </Link>
              </li>
            </li>
          </ul>
        </div>
        <Link className="font-poppins text-2xl text-info font-semibold lg:ms-5">
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
  return (
    <>
      <div className="navbar-end flex gap-5">
        <Link to="/collections" className="hidden md:block font-poppins text-xl text-info font-semibold">
          Collection
        </Link>
        <Link to="/my-collections" className="hidden md:block font-poppins text-xl text-info font-semibold">
          My Collection
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar me-3 lg:me-5 object-cover"
          >
            <div className="w-12 rounded-full">
              <img
                className="w-12 object-cover"
                alt="Tailwind CSS Navbar component"
                src="https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/my-profile" className="justify-between text-lg font-poppins text-info">
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <Link to="/settings" className="font-poppins text-lg text-info">Settings</Link>
            </li>
            <li>
              <Link to="/logout" className="font-poppins text-lg text-info">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 sticky top-0 z-10 border-b border-primary">
      <NavbarStart />
      {/* <NavbarCenter /> */}
      <NavbarEnd />
    </div>
  );
}
