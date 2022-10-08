import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAllState } from "../Provider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const navToDashboard = useNavigate();
  const { setToken } = useAllState();
  const [hintUsernameInput, setHintUsernameInput] = useState(false);
  const [hintPasswordInput, setHintPasswordInput] = useState(false);
  const [hintInfoWrong, setHintInfoWrong] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    username: "",
    password: "",
  });
  const userHandler = (e) => {
    setCurrentUser({ ...currentUser, [e.target.name]: e.target.value });
  };

  const cookies = new Cookies();
  const login = async () => {
    if (currentUser.username === "") {
      setHintUsernameInput(true);
    } else {
      setHintUsernameInput(false);
    }
    if (currentUser.password === "") {
      setHintPasswordInput(true);
    } else {
      setHintPasswordInput(false);
    }
    if (currentUser.username !== "" && currentUser.password !== "") {
      const getToken = async () => {
        setIsLoaded(true);
        fetch("http://localhost:4000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: currentUser.username,
            password: currentUser.password,
          }),
        })
          .then((data) => {
            console.log(data);
            if (data.status === 200) {
              toast.success("You have successfully logged in!");
              setTimeout(() => navToDashboard("/user/dashboard"), 3000);

            } else {
              setHintInfoWrong(true);
              setIsLoaded(false);
            }
            return data.json();
          })
          .then(({ token }) => {
            cookies.set("token", token);
            setToken(cookies.get("token"));
          });
      };
      getToken();
    }
  };

  return (
    <>
      <section className="wrapperSignUpBg flex">
        <div className="md:w-1/2 py-4 md:flex hidden items-center justify-center">
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
        </div>
        <div className="md:w-1/2 py-4 w-full flex items-center justify-center text-center md:px-4 z-0  sm:mt-0 md:mt-0">
          <div className="w-[420px] px-5 bg-[#607027] py-10 text-center mb-11 relative ">
            <div className="z-20 w-full flex flex-col items-center signupSection">
              <div className="">
                <h1 className="text-3xl font-bold mb-4 text-white text-center">
                  Login into account
                </h1>
                <h3 className="text-gray-200 text-base font-normal text-center mb-10">
                  Use your credentials to access your account.
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
                    className="block overflow-visible relative flex-auto w-[1%] pl-0 py-3 bg-inherit h-auto text-md focus:outline-none focus:bg-inherit rounded-2xl"
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
                <div
                  className={`${
                    hintUsernameInput ? "" : "hidden"
                  } text-left text-[chartreuse] text-xs -mt-[14px] mb-2`}
                >
                  You missed a spot! Don't forget to add your username.
                </div>
                <div className="relative flex flex-wrap items-stretch mb-4 w-full bg-gray-100 text-[1rem] font-normal leading-6 rounded-2xl">
                  <div className="-mr-[1px] flex text-[#98a3ae] text-left">
                    <span className="py-3 px-4 pr-2 text-center inline-block min-w-[48px] whitespace-nowrap bg-inherit">
                      <i className="fa fa-key"></i>
                    </span>
                  </div>
                  <input
                    className="block overflow-visible relative flex-auto w-[1%] pl-0 py-3 bg-inherit h-auto text-md focus:outline-none focus:bg-inherit rounded-2xl"
                    type="password"
                    name="password"
                    id="password"
                    value={currentUser.password}
                    onChange={userHandler}
                    placeholder="password"
                    autoComplete="off"
                    spellcheck="false"
                  />
                </div>
                <div
                  className={`${
                    hintPasswordInput ? "" : "hidden"
                  } text-left text-[chartreuse] text-xs -mt-[14px] mb-2`}
                >
                  You missed a spot! Don't forget to add your password.
                </div>
                <div className="text-center text-gray-200 hover:underline hover:text-gray-100">
                  <Link to={"#"}>Forgot your password?</Link>
                </div>
                <div
                  className={`${
                    hintInfoWrong ? "" : "hidden"
                  } text-center text-yellow-500 text-xs mt-3`}
                >
                  The username or password you entered is incorrect.
                </div>
                <div className="px-4 pb-2 pt-4">
                  <button
                    onClick={login}
                    className={`uppercase block w-full py-2 text-lg text-white rounded-full focus:outline-none ${
                      isLoaded
                        ? "bg-indigo-300 hover:bg-indigo-300"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    } `}
                  >
                    sign in
                    <span className={`ml-5 ${isLoaded ? "" : "hidden"}`}>
                      <div className="lds-circle">
                        <div></div>
                      </div>
                    </span>
                  </button>
                </div>
                <div className="mt-10 mb-4 text-center">
                  <div className="block text-center mb-2 text-sm text-gray-100">
                    or login with
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
        </div>
        <ToastContainer pauseOnHover='false' toastStyle={{background : '#607027'}}/>
      </section>
    </>
  );
}
