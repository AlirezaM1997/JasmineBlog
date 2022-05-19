import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAllState } from "../Provider";
import { OffCanvas, OffCanvasMenu } from "react-offcanvas";

export default function Header() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const { userInfo } = useAllState();

  const showMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  return (
    <>
      <div
        className={`backdropOffCanvas bg-[#00000066] fixed h-screen w-screen z-30 ${
          isMenuOpened ? "" : "hidden"
        }`}
        onClick={showMenu}
      ></div>

      <header className="block relative z-20 bg-white">
        <nav className="navigation-bar_fullWidth tablet:hidden h-[100px] z-[1] relative text-center block ">
          <div className="navigation-bar_inner pl-[43px] pr-[15px] container mx-auto relative flex items-center text-center" style={{flexWrap:'initial'}}>
            <div className="navigation-bar_section first:pl-0 min-w-0 pr-2 truncate text-center">
              <div className="header-logo inline-block align-middle">
                <Link to={"/"} className="block">
                  <img
                    src={require("../images/logo.jpg")}
                    alt="Jasmine"
                    className="logoImg p-0 max-h-[70px] max-w-full"
                  />
                </Link>
              </div>
            </div>
            <div className="navigation-wrapper overflow-hidden flex-1">
              <div className="main-menu">
                <ul className="navigation-main text-[0] inline-block align-middle whitespace-nowrap m-0 p-0 list-none ">
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/"}
                      className="navLink py-0 px-[10px] text-[14.5px] font-medium h-[100px] leading-[100px] text-[#000000cc] inline-block uppercase relative"
                    >
                      home
                    </Link>
                  </li>
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/"}
                      className="navLink py-0 px-[10px] text-[14.5px] font-medium h-[100px] leading-[100px] text-[#000000cc] inline-block uppercase relative"
                    >
                      category
                    </Link>
                  </li>
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/about"}
                      className="navLink py-0 px-[10px] text-[14.5px] font-medium h-[100px] leading-[100px] text-[#000000cc] inline-block uppercase relative"
                    >
                      about
                    </Link>
                  </li>
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/contact"}
                      className="navLink py-0 px-[10px] text-[14.5px] font-medium h-[100px] leading-[100px] text-[#000000cc] inline-block uppercase relative"
                    >
                      contact
                    </Link>
                  </li>
                  <li className="inline-block text-left whitespace-normal text-base">
                    <Link
                      to={"/"}
                      className="navLink py-0 px-[10px] text-[14.5px] font-medium h-[100px] leading-[100px] text-[#000000cc] inline-block uppercase relative"
                    >
                      menu
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
                  <div className="flex flex-shrink-0 items-center text-white px-2">
                    <img
                      src={`${process.env.REACT_APP_DOMAIN}/${userInfo.avatar}`}
                      className="h-10 w-10 rounded-full border border-[#607027]"
                    ></img>
                    {/* <div className="text-md font-medium text-gray-600 ml-1">
                      {userInfo.username}
                    </div> */}
                  </div>
                </Link>
              )}
            </div>
          </div>
        </nav>
        <div className="mobile-header fablet:block makbook:hidden relative bg-white">
          <div className="mobile-header__inner flex justify-between w-full items-center px-4">
            <div className="header-branding pr-5 whitespace-nowrap min-w-0 text-left">
              <div className="header-logo text-left">
                <Link to={"/"}>
                  <img
                    className="logo-image md:max-h-[66px] py-2 max-h-[50px] md:min-h-[70px]"
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
        width={300}
        transitionDuration={300}
        effect={"parallax"}
        isMenuOpened={isMenuOpened}
        position={"left"}
      >
        <OffCanvasMenu className="offCanvasMenu z-30 bg-white h-full">
          <div className="offcanvas__title relative text-sm py-[20px] pl-5 pr-[50px] border-b">
            <h2 className="site-logo md:text-[2.074rem] leading-5 ">
              <Link to={"/"} onClick={showMenu}>
                <img
                  src={require("../images/logo.jpg")}
                  alt="Jasmine"
                  className="w-full max-w-[140px]"
                />
              </Link>
            </h2>
            <div className="mt-3">
              {!userInfo ? (
                <div className="flex">
                  <Link
                    to={"/user/login"}
                    onClick={showMenu}
                    className="bg-[#607027] hover:text-gray-700 text-white py-2 px-2 rounded mr-2 outline-none"
                  >
                    Log in
                  </Link>

                  <Link
                    to={"/user/signup"}
                    onClick={showMenu}
                    className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-2 rounded"
                  >
                    Sign up
                  </Link>
                </div>
              ) : (
                <Link to={"/user/dashboard"} onClick={showMenu}>
                  <div className="flex flex-shrink-0 items-center space-x-4 text-white">
                    <img
                      src={userInfo.avatar}
                      className="h-10 w-10 rounded-full border border-[#607027]"
                    ></img>
                    <div className="text-md font-medium text-black font-[cursive]">
                    {userInfo.username}
                    </div>
                  </div>
                </Link>
              )}
            </div>
            <span
              className="absolute top-2 right-2 bottom-auto left-auto border-[1px] rounded-full h-[30px] w-[30px] flex items-center justify-center cursor-pointer"
              onClick={showMenu}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </span>
          </div>
          <div className="offcanvas__section p-[20px]">
            <div className="offcanvas-menu-mobile">
              <ul className="p-0 -mx-5 my-0">
                <li className="text-[#00000099]">
                  <Link
                    to={"/"}
                    onClick={showMenu}
                    className="text-sm font-normal py-[10px] px-[20px] block uppercase relative"
                  >
                    home
                  </Link>
                </li>
                <li className="text-[#00000099]">
                  <Link
                    to={"/"}
                    onClick={showMenu}
                    className="text-sm font-normal py-[10px] px-[20px] block uppercase relative"
                  >
                    category
                  </Link>
                </li>
                <li className="text-[#00000099]">
                  <Link
                    to={"/about"}
                    onClick={showMenu}
                    className="text-sm font-normal py-[10px] px-[20px] block uppercase relative"
                  >
                    about
                  </Link>
                </li>
                <li className="text-[#00000099]">
                  <Link
                    to={"/contact"}
                    onClick={showMenu}
                    className="text-sm font-normal py-[10px] px-[20px] block uppercase relative"
                  >
                    contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </OffCanvasMenu>
      </OffCanvas>

      <Outlet />
    </>
  );
}
