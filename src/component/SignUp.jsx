import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAllState } from "../Provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function SignUp() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
    name: "",
  });
  const userHandler = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };
  const navToLogin = useNavigate();

  const submitUser = async () => {
    // const { setToken } = useAllState();
    fetch("http://localhost:4000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: currentUser.username,
        name: currentUser.name,
      }),
    }).then(() => {
      console.log("!!!!");
      navToLogin("/user/login");
    });
  };

  return (
    <>
      <section className="wrapperSignUpBg flex">
        <diiv className="md:w-1/2 py-4 w-full flex items-center justify-center text-center md:px-4 z-0  sm:mt-0 md:mt-0">
          <div className="w-[420px] px-5 bg-[#607027] py-10 text-center mb-11 relative ">
            <div className="z-20 w-full flex flex-col items-center signupSection">
              <div className="">
                <h1 className="text-3xl font-bold mb-4 text-white text-center">
                  Create an account
                </h1>
                <h3 className="text-gray-200 text-base font-normal text-center mb-10">
                  Setup a new account in a minute.
                </h3>
              </div>
              <div className="w-full ">
                <div className="relative flex flex-wrap items-center mb-4 w-full bg-gray-100 text-[1rem] font-normal leading-6 rounded-2xl">
                  <div className="-mr-[1px] flex text-[#98a3ae] text-left">
                    <span className="py-3 px-4 pr-2 text-center inline-block min-w-[48px] whitespace-nowrap bg-inherit">
                      <FontAwesomeIcon
                        className="overflow-hidden fill-current align-middle"
                        icon={faUser}
                      ></FontAwesomeIcon>
                    </span>
                  </div>
                  <input
                    className="block overflow-visible relative flex-auto w-[1%] p-3 pr-4 bg-inherit h-auto text-md focus:outline-none focus:bg-inherit rounded-2xl"
                    type="text"
                    name="username"
                    id="username"
                    value={currentUser.username}
                    onChange={userHandler}
                    placeholder="username"
                    autoComplete="off"
                    spellcheck="false"
                  />
                </div>
                <div className="relative flex flex-wrap items-stretch mb-4 w-full bg-gray-100 text-[1rem] font-normal leading-6 rounded-2xl">
                  <div className="-mr-[1px] flex text-[#98a3ae] text-left">
                    <span className="py-3 px-4 pr-2 text-center inline-block min-w-[48px] whitespace-nowrap bg-inherit">
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    className="block overflow-visible relative flex-auto w-[1%] p-3 pr-4 bg-inherit h-auto text-md focus:outline-none focus:bg-inherit rounded-2xl"
                    type="text"
                    name="password"
                    id="password"
                    value={currentUser.password}
                    onChange={userHandler}
                    placeholder="password"
                    autoComplete="off" spellcheck="false"
                  />
                </div>
                <div className="relative flex flex-wrap items-stretch mb-4 w-full bg-gray-100 text-[1rem] font-normal leading-6 rounded-2xl">
                  <div className="-mr-[1px] flex text-[#98a3ae] text-left">
                    <span className="py-3 px-4 pr-2 text-center inline-block min-w-[48px] whitespace-nowrap bg-inherit">
                      <i className="fa fa-address-book"></i>
                    </span>
                  </div>
                  <input
                    className="block overflow-visible relative flex-auto w-[1%] p-3 pr-4 bg-inherit h-auto text-md focus:outline-none focus:bg-inherit rounded-2xl"
                    type="text"
                    name="name"
                    id="name"
                    value={currentUser.name}
                    onChange={userHandler}
                    autoComplete="off"
                    placeholder="name"
                    spellcheck="false"
                  />
                </div>

                <div className="px-4 pb-2 pt-4">
                  <button
                    onClick={submitUser}
                    className="uppercase block w-full p-1 py-2 text-lg text-white rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none"
                  >
                    sign up
                  </button>
                </div>
                <div className="mt-10 mb-4 text-center">
                  <div className="block text-center mb-2 text-sm text-gray-100">
                    or register with
                  </div>
                  <button className="p-0 inline-block bg-opacity-0 mr-4 text-sm text-black overflow-visible font-bold hover:underline">
                    Facebook
                  </button>
                  <button className="p-0 inline-block bg-opacity-0 mr-4 text-sm text-black overflow-visible font-bold hover:underline">
                    Google
                  </button>
                  <button className="p-0 inline-block bg-opacity-0 mr-4 text-sm text-black overflow-visible font-bold hover:underline">
                    Twitter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </diiv>
        <diiv className="md:w-1/2 py-4 md:flex hidden items-center justify-center">
          <div className="w-[420px] py-14 px-1 text-center relative">
            <div className="z-20 w-5/6 flex flex-col items-start signupSection">
              <div className="pl-6">
                <h1 className="text-5xl font-bold text-left tracking-wide text-black border-l-4 border-yellow-600 pl-2">
                  Keep it special
                </h1>
                <p className="text-xl my-4 text-gray-700 text-left">
                  Capture your personal memory in unique way, anywhere.
                </p>
                <div className="flex justify-end">
                  <img
                    src={require("../images/logopng.png")}
                    className="inline-block w-[6rem]"
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </diiv>
      </section>
    </>
  );
}
