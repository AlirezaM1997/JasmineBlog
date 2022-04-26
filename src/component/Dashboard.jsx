import React, { useRef, useState } from "react";
import { useAllState } from "../Provider";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";


export default function Dashboard() {
  const navToHome = useNavigate();

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editor = useRef(null);
  const focusEditor = () => {
    editor.current.focus();
  };

  const { userInfo } = useAllState();
  const [state, setState] = useState({
    posts: true,
    account: false,
    newPost: false,
  });
  const clickHandler = (value) => {
    setState({
      posts: false,
      account: false,
      newPost: false,
    });
    if (state[value]) {
      setState({
        [value]: state[value],
      });
    } else {
      setState({
        [value]: !state[value],
      });
    }
  };

  const [showModal, setShowModal] = useState(false);

  const Modal = () => {
    const { setToken } = useAllState();
    const { setUserInfo } = useAllState();
    const cookies = new Cookies();
    const Logout = () => {
      setShowModal(true);
      cookies.remove("token");
      setToken("");
      setUserInfo()
      // navToHome('/')
      window.location.href='/';
    };
    return (
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*body*/}
              <div className="relative p-6 flex-auto">
                <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Are you sure want to log out ?
                </p>
              </div>
              {/*footer*/}
              <div className="modal flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-gray-100 text-gray-800 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-gray-100 text-red-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={Logout}
                >
                  Log out
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    );
  };

  return (
    <>
      <div className="h-screen w-full bg-white relative flex overflow-hidden">
        <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
          <div
            onClick={() => clickHandler("posts")}
            className={`h-10 w-full flex items-center justify-center rounded-l cursor-pointer  duration-300 ${
              state.posts
                ? "text-gray-800 bg-white  duration-300 ease-linear"
                : "hover:bg-gray-700"
            } `}
          >
            <i
              className="h-6 w-6 flex fa fa-sticky-note"
              aria-hidden="true"
            ></i>
          </div>

          <div
            onClick={() => clickHandler("newPost")}
            className={`h-10 w-full flex items-center justify-center rounded-l cursor-pointer  duration-300 ${
              state.newPost
                ? "text-gray-800 bg-white  duration-300 ease-linear"
                : "hover:bg-gray-700"
            } `}
          >
            <i
              className="h-6 w-6 flex fa fa-pencil-square-o"
              aria-hidden="true"
            ></i>
          </div>

          {/* <div className="h-10 w-full flex items-center justify-center rounded-l cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i className="h-6 w-6 flex fa fa-sign-out" aria-hidden="true"></i>
          </div> */}

          <div
            onClick={() => clickHandler("account")}
            className={`h-10 w-full flex items-center justify-center rounded-l cursor-pointer duration-300 ${
              state.account
                ? "text-gray-800 bg-white duration-300 ease-linear"
                : "hover:bg-gray-700 "
            } `}
          >
            <i
              className="h-6 w-6 flex fa fa-user-circle-o"
              aria-hidden="true"
            ></i>
          </div>
        </aside>

        <div className="w-full h-full flex flex-col justify-between">
          <header className="h-16 w-full flex items-center relative justify-between px-5 space-x-10 bg-gray-800">
            <div>
              <i
                class="fa fa-home text-white cursor-pointer homeIcon"
                aria-hidden="true"
                onClick={() => navToHome("/")}
              ></i>
            </div>
            <div className="flex flex-shrink-0 items-center space-x-4 text-white">
              <div className="flex flex-col items-end ">
                <div className="text-md font-medium ">{userInfo.name}</div>

                <div className="text-sm font-regular"></div>
              </div>

              <img
                src={userInfo.imgurl}
                className="h-10 w-10 rounded-full border-2 border-blue-400"
              ></img>
            </div>
          </header>

          <main className="max-w-full h-full flex flex-col p-4">
            <div>
              {state.posts ? (
                <h5 className="text-3xl font-bold">All Posts</h5>
              ) : state.newPost ? (
                <h5 className="text-3xl font-bold">Add a New Post</h5>
              ) : state.account ? (
                <h5 className="text-3xl font-bold">Your Account</h5>
              ) : (
                ""
              )}
            </div>
            <div className="h-full w-full flex flex-wrap my-4">
              {state.newPost ? (
                <div onClick={() => focusEditor()}>
                  <Editor
                    ref={editor}
                    editorState={editorState}
                    onChange={(editorState) => setEditorState(editorState)}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder={"Type here..."}
                  />
                  <button className="mt-3 px-6 py-4 bg-purple-600 text-white font-medium text-md leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg  focus:outline-none  active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">
                    Submit
                  </button>
                </div>
              ) : (
                ""
              )}
              {state.account ? (
                <div className="p-4">
                  <button
                    className="px-6 py-4 bg-red-600 text-white rounded shadow-md hover:bg-red-700 hover:shadow-lg"
                    onClick={() => setShowModal(true)}
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
            {showModal ? <Modal /> : null}
          </main>
        </div>
      </div>
    </>
  );
}
