import React, { useEffect, useRef, useState } from "react";
import { useAllState } from "../Provider";
import { Link, Outlet, useLocation } from "react-router-dom";

import Cookies from "universal-cookie";
import Loading from "./Loading";

export default function Dashboard() {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const showMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };

  const { token } = useAllState();
  const { userInfo } = useAllState();

  const [myBlogs, setMyBlogs] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(myBlogs);
  const cookies = new Cookies();

  const parseISOString = (s) => {
    // return new Date(toString(s));
    console.log(s);
    return s;
  };

  let location = useLocation();
  console.log(location.pathname);
  useEffect(() => {
    fetch(`http://localhost:4000/blog/my-blogs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((result) => {
        setMyBlogs(result);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="w-full bg-white relative flex ">
        <div className="w-full h-full flex flex-col justify-between">
          <header className="h-16 w-full flex items-center justify-between relative  px-5 space-x-10 bg-[#EEEEEE]">
            <div>
              <Link to={"/"}>
                <img
                  src={require("../images/logopng.png")}
                  className="w-24"
                ></img>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex flex-shrink-0 items-center space-x-4">
                <div className="flex flex-col items-end ">
                  <div className="text-md font-medium ">{userInfo.name}</div>
                  <div className="text-sm font-regular"></div>
                </div>
                <img
                  src={userInfo.imgurl}
                  className="h-10 w-10 rounded-full border border-[#607027]"
                ></img>
              </div>
              <div className="ml-2 cursor-pointer relative" onClick={showMenu}>
                <i class="fa fa-user-circle " aria-hidden="true"></i>
                <div
                  className={`w-[100px] h-[80px] absolute right-0 top-[34px] bg-white rounded-sm border p-2 text-sm ${
                    isMenuOpened ? "" : "hidden"
                  }`}
                >
                  <ul className="h-full">
                    <li
                      className="h-1/2 flex items-center border-b"
                      onClick={showMenu}
                    >
                      setting
                    </li>
                    <li className="h-1/2 flex items-center" onClick={showMenu}>
                      <p>log out</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </header>

          {location.pathname === "/user/dashboard" ? (
            <main className="max-w-full h-full flex flex-col px-2 pt-3 min-h-screen">
              <div className="h-full w-full flex flex-wrap justify-center mb-[55px]">
                {loading ? (
                  <Loading />
                ) : myBlogs.length === 0 ? (
                  <div>
                    <div>You have not created any posts</div>
                    <Link to={"/user/dashboard/createblog"}>Add</Link>
                  </div>
                ) : (
                  <section className="text-gray-600 body-font w-full">
                    <div className="container py-10 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        {myBlogs.map((item) => (
                          <div className="p-4 sm:w-full w-full dashboardCard">
                            <div className="h-full shadow rounded overflow-hidden">
                              <img
                                className="w-full h-60 object-cover object-center"
                                src={item.imgurl}
                                style={{ height: "15rem" }}
                                alt="blog"
                              />
                              <div className="py-3 px-4">
                                <h2 className="text-xs tracking-wide title-font font-medium text-gray-400 mb-1">
                                  {parseISOString(item.createdAt)}
                                </h2>
                                <h1 className="title-font text-lg font-medium text-gray-600 mb-1">
                                  {item.title}
                                </h1>
                                <p
                                  className="leading-relaxed mb-3 text-sm overflow-hidden truncate whitespace-nowrap"
                                  dangerouslySetInnerHTML={{
                                    __html: item.content,
                                  }}
                                ></p>
                                <div className="flex items-center justify-center flex-wrap ">
                                  <button
                                    className="px-8 py-2 w-2/6 bg-[#607027] text-white transition-all duration-300 rounded"
                                    onClick={(e) => {
                                      // getPostForEdit(item._id);
                                      // setCurrentPostId(item._id);
                                    }}
                                  >
                                    Edit
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* {state.account ? (
                <div className="w-full p-4" id="editSection">
                  <EditUser userInfo={userInfo} />
                </div>
              ) : (
                ""
              )} */}
              </div>
            </main>
          ) : (
            ""
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
