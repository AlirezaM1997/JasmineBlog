import React, { useState } from "react";
import '../style/header.css'
import { Link, Outlet, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAllState } from "../Provider";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";

export default function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { token } = useAllState();
  const { userInfo } = useAllState();

  const showMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  return (
    <>
      <div
        className={`backdropOffCanvas fixed h-screen w-screen z-30 ${
          isMenuOpened ? "" : "hidden"
        }`}
        onClick={showMenu}
      ></div>

      <header className="block relative z-20 bg-white">
        <nav className="navigation-bar_fullWidth relative text-center block ">
          <div className="navigation-bar_inner container mx-auto relative flex items-center text-center">
            <div className="navigation-bar_section first:pl-0 min-w-0 pr-2 truncate text-center">
              <div className="header-logo inline-block align-middle">
                <Link to={"/"} className="block">
                  <img
                    src={require("../images/logo.jpg")}
                    alt="Jasmine"
                    className="logoImg p-0 max-w-full"
                  />
                </Link>
              </div>
            </div>
            <div className="navigation-wrapper overflow-hidden flex-1">
              <div className="main-menu">
                <ul className="navigation-main inline-block align-middle whitespace-nowrap m-0 p-0 list-none ">
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/"}
                      className="navLink inline-block uppercase relative"
                    >
                      home
                    </Link>
                  </li>
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/"}
                      className="navLink inline-block uppercase relative"
                    >
                      category
                    </Link>
                  </li>
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/about"}
                      className="navLink inline-block uppercase relative"
                    >
                      contact
                    </Link>
                  </li>
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/contact"}
                      className="navLink inline-block uppercase relative"
                    >
                      home
                    </Link>
                  </li>
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/"}
                      className="navLink inline-block uppercase relative"
                    >
                      home
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="navigation-bar_section last:pr-0">
              {!userInfo ? (
                <div className="flex">
                  <Link
                    to={"/user/login"}
                    className="hover:text-gray-700 text-gray-800 font-semibold py-2 px-2 rounded mr-2 outline-none"
                  >
                    Log in
                  </Link>

                  <Link
                    to={"/user/signup"}
                    className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-2 rounded"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <Link to={"/user/dashboard"}>
                  <div className="flex flex-shrink-0 items-center space-x-4 text-white">
                    <img
                      src={userInfo.imgurl}
                      className="h-10 w-10 rounded-full border-2 border-blue-400"
                    ></img>
                    <div className="text-md font-medium ">
                      {userInfo.username}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </nav>
        <div className="mobile-header relative bg-white">
          <div className="mobile-header__inner flex justify-between w-full items-center px-4">
            <div className="header-branding pr-5 whitespace-nowrap min-w-0 text-left">
              <div className="header-logo text-left">
                <Link to={"/"}>
                  <img
                    className="logo-image py-2 md:min-h-[70px]"
                    src={require("../images/logo.jpg")}
                    alt="Jasmine"
                  ></img>
                </Link>
              </div>
            </div>
            <div className="mobile-header__section pr-0 whitespace-nowrap text-right">
              <div className="flexbox-header-icon">
                <i
                  className="icon-menu inline-block align-middle cursor-pointer"
                  onClick={showMenu}
                ></i>
              </div>
            </div>
          </div>
        </div>
      </header>
      <OffCanvas
        // width={300}
        transitionDuration={300}
        effect={"parallax"}
        isMenuOpened={isMenuOpened}
        position={"left"}
      >
        <OffCanvasMenu className="offCanvasMenu z-30 bg-white h-full">
          <ul>
            <li>Link 1</li>
            <li>Link 2</li>
            <li>Link 3</li>
            <li>Link 4</li>
            <li>Link 5</li>
          </ul>
        </OffCanvasMenu>
      </OffCanvas>
      {/* <nav className="bg-gray-800 z-10 relative">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center sm:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={showMenu}
              >
                <span className="sr-only">Open main menu</span>

                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="sm:block hidden">
              <Link to={"/"}>
                <img
                  src="https://www.freeiconspng.com/uploads/blogger-logo-icon-png-0.png"
                  width="40"
                  alt="Logo"
                />
              </Link>
            </div>
            <div className="flex-1 hidden sm:flex sm:ml-6 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex space-x-4">
                <Link
                  to={"/"}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to={"/about"}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  About
                </Link>
                <Link
                  to={"/contact"}
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex">
              {userInfo ? (
                <button
                  type="button"
                  className="bg-gray-800 p-1 mr-4 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              ) : (
                ""
              )}

              {!userInfo ? (
                <div className="flex">
                  <Link
                    to={"/user/login"}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-2 border border-gray-400 rounded shadow mr-2"
                  >
                    Log in
                  </Link>

                  <Link
                    to={"/user/signup"}
                    className="bg-gray-800 hover:bg-gray-600 text-white font-semibold py-2 px-2 border border-gray-400 rounded shadow"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <Link to={"/user/dashboard"}>
                  <div className="flex flex-shrink-0 items-center space-x-4 text-white">
                    <img
                      src={userInfo.imgurl}
                      className="h-10 w-10 rounded-full border-2 border-blue-400"
                    ></img>
                    <div className="text-md font-medium ">
                      {userInfo.username}
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        <div
          className={` w-full bg-gray-700 rounded rounded-t-none duration-500 transition-all ${
            showMobMenu ? "" : "hidden"
          }`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 ">
            <Link
              to={"/"}
              onClick={showMenu}
              className="text-gray-300 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Home
            </Link>
            <Link
              to={"/about"}
              onClick={showMenu}
              className="text-gray-300 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              About
            </Link>
            <Link
              to={"/contact"}
              onClick={showMenu}
              className="text-gray-300 hover:bg-gray-500 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      </nav> */}
      <Outlet />
    </>
  );
}
