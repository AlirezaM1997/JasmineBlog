import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAllState } from "../Provider";

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
        setIsLoaded(true)
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
            if (data.status === 200) {
              navToDashboard("/user/dashboard");
            } else {
              setHintInfoWrong(true);
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
      <section className="flex items-stretch text-white ">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          id=""
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
          }}
        >
          <div
            className="absolute bg-black opacity-60 inset-0 z-0"
            style={{ opacity: "0.6" }}
          ></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Keep it special
            </h1>
            <p className="text-3xl my-4">
              Capture your personal memory in unique way, anywhere.
            </p>
          </div>

        </div>
        <div
          className="lg:w-1/2  py-4 w-full flex items-center justify-center text-center md:px-16 px-0 z-0  sm:mt-0 md:mt-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage:
                " url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)",
            }}
          >
            <div
              className="absolute bg-black opacity-60 inset-0 z-0"
              style={{ opacity: "0.6" }}
            ></div>
          </div>
          <div className="w-full z-20">
            <h1 className=" text-4xl">Log in</h1>
            <div className="py-6 space-x-2">
              <span className="cursor-pointer w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                f
              </span>
              <span className="cursor-pointer w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                G+
              </span>
              <span className="cursor-pointer w-10 h-10 items-center justify-center inline-flex rounded-full font-bold text-lg border-2 border-white">
                in
              </span>
            </div>
            <p className="text-gray-100">or use username your account</p>
            <div className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
              <div className="pb-2 pt-4">
                <div className="mb-3 text-left">Your Username</div>
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="text"
                  name="username"
                  id="username"
                  value={currentUser.username}
                  onChange={userHandler}
                  placeholder="username"
                  autoComplete="off"
                />
              </div>
              <div
                className={`${
                  hintUsernameInput ? "" : "hidden"
                } text-left text-red-500 text-xs`}
              >
                You missed a spot! Don't forget to add your username.
              </div>
              <div className="pb-2 pt-4">
                <div className="mb-3 text-left">Your Password</div>
                <input
                  className="block w-full p-4 text-lg rounded-sm bg-black"
                  type="password"
                  name="password"
                  id="password"
                  value={currentUser.password}
                  onChange={userHandler}
                  placeholder="••••"
                  autoComplete="off"
                />
              </div>
              <div
                className={`${
                  hintPasswordInput ? "" : "hidden"
                } text-left text-red-500 text-xs`}
              >
                You missed a spot! Don't forget to add your password.
              </div>
              <div className="text-center text-gray-400 hover:underline hover:text-gray-100">
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
                  className={`uppercase block w-full py-2 text-lg rounded-full focus:outline-none ${isLoaded ? 'bg-indigo-300 hover:bg-indigo-300':'bg-indigo-500 hover:bg-indigo-600'} `}
                >
                  sign in
                  <span className={`ml-5 ${isLoaded ? "" : "hidden"}`}>
                    <i className="fa fa-refresh fa-spin"></i>
                  </span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
