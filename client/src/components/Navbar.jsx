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
        <Link to={"/home"} className="font-poppins text-2xl font-semibold text-info lg:ms-5">
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
  console.log(localStorage.photoURL.split("=")[0]);
  return (
    <>
      <div className="navbar-end flex gap-5">
        <Link
          to="/collections"
          className="hidden font-poppins text-xl font-semibold text-info md:block"
        >
          Collection
        </Link>
        <Link
          to="/my-collections"
          className="hidden font-poppins text-xl font-semibold text-info md:block"
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
                src={localStorage.photoURL ? localStorage.photoURL.split("=")[0] + "photo.jpg" : "https://images.pexels.com/photos/208984/pexels-photo-208984.jpeg"}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link
                to="/my-profile"
                className="justify-between font-poppins text-lg text-info"
              >
                Profile
                {/* <span className="badge">New</span> */}
              </Link>
            </li>
            <li>
              <Link to="/settings" className="font-poppins text-lg text-info">
                Settings
              </Link>
            </li>
            <li>
              <Link to="/logout" className="font-poppins text-lg text-info">
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
  return (
    <div className="navbar sticky top-0 z-10 border-b border-primary bg-base-100">
      <NavbarStart />
      {/* <NavbarCenter /> */}
      <NavbarEnd />
    </div>
  );
}
