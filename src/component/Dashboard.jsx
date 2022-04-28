import React, { useRef, useState } from "react";
import { useAllState } from "../Provider";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
// import DOMPurify from 'dompurify';

export default function Dashboard() {
  const { token } = useAllState();
  const { setUserInfo } = useAllState();

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  console.log(convertedContent);

  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  const editor = useRef(null);
  // const focusEditor = () => {
  //   editor.current.focus();
  // };

  const submitBLog = async () => {
    fetch("http://localhost:4000/blog/write", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        title: title,
        content: convertedContent,
        imgurl: imgUrl,
      }),
    }).then(() => {
      console.log("!!!!");
    });
    setConvertedContent(null);
    setTitle("");
  };

  const navToHome = useNavigate();

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

  const [showEdit, setShowEdit] = useState(false);

  const editShow = () => {
    setShowEdit(!showEdit);
    const scrollTo = () => {
      if (!showEdit) {
        const scrollDiv = document.getElementById("saveEdit").offsetTop;
        window.scrollTo({ top: scrollDiv - 500, behavior: "smooth" });
      } else {
        return;
      }
    };
    setTimeout(scrollTo, 100);
  };

  const [name, setName] = useState(userInfo.name);
  const [phonenumber, setPhonenumber] = useState(userInfo.phoneNumber);
  const [imgurl, setImgurl] = useState(userInfo.imgurl);

  const updateUser = async () => {
    fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        if (res && res._id) {
          setUserInfo(res);
        }
      });
  };
  const editUser = async () => {
    fetch("http://localhost:4000/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({
        data: {
          name: name,
          phoneNumber: phonenumber,
          imgurl: imgurl,
        },
      }),
    }).then(() => {
      console.log("!!!!");
    });
    updateUser();
  };

  const [showModal, setShowModal] = useState(false);

  const Modal = () => {
    const { setToken } = useAllState();
    const cookies = new Cookies();
    const Logout = () => {
      setShowModal(true);
      cookies.remove("token");
      setToken("");
      setUserInfo();
      // navToHome('/')
      window.location.href = "/";
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
      <div className="w-full bg-white relative flex ">
        <aside className="fixed h-full w-16 flex flex-col space-y-10 items-center justify-center bg-gray-800 text-white">
          {/* <img
              src={require("../images/logo.png")}
              width="40"
              alt="Logo" className="absolute w-14"
            /> */}

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
          <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
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

          <main className="max-w-full h-full flex flex-col p-4 pl-20 min-h-screen">
            <div>
              {state.posts ? (
                <h5 className="text-3xl font-bold">All Posts</h5>
              ) : state.newPost ? (
                <h5 className="text-3xl font-bold">Add a New Post</h5>
              ) : state.account ? (
                <h5 className="text-3xl font-bold">Account</h5>
              ) : (
                ""
              )}
            </div>
            <div className="h-full w-full flex flex-wrap">
              {state.newPost ? (
                <div>
                  <div>
                    <input
                      className="w-full my-3 p-2 focus:bg-white focus:outline-none border-2 border-black rounded"
                      type="text"
                      placeholder="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <Editor
                    ref={editor}
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    placeholder={"Type something here ..."}
                  />
                  <div>
                    <input
                      className="w-full my-3 p-2 focus:bg-white focus:outline-none border-2 border-black rounded"
                      type="text"
                      placeholder="image url"
                      value={imgUrl}
                      onChange={(e) => setImgUrl(e.target.value)}
                    />
                  </div>
                  <button
                    className="mt-3 px-6 py-4 bg-purple-600 text-white font-medium text-md leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg  focus:outline-none  active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={submitBLog}
                  >
                    Submit
                  </button>
                </div>
              ) : (
                ""
              )}
              {state.account ? (
                <div className="w-full p-4" id="editSection">
                  <div className="flex justify-end mb-4">
                    <button
                      className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:shadow-lg outline-0 focus:outline-none"
                      onClick={() => setShowModal(true)}
                    >
                      Log Out
                      <i class="fa fa-sign-out ml-3" aria-hidden="true"></i>
                    </button>
                  </div>
                  <div class="w-full top h-64 bg-blue-600 rounded-md overflow-hidden relative">
                    <img
                      src="https://images.unsplash.com/photo-1503264116251-35a269479413?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"
                      alt=""
                      class="bg w-full h-full object-cover object-center absolute z-0"
                    />
                    <div class="flex flex-col justify-center items-center relative h-full bg-black bg-opacity-50 text-white">
                      <img
                        src={userInfo.imgurl}
                        class="h-24 w-24 object-cover rounded-full"
                      />
                      <h1 class="text-2xl font-semibold">{userInfo.name}</h1>
                      <h4 class="text-sm font-semibold">{userInfo.username}</h4>
                    </div>
                  </div>
                  <div className="flex justify-center my-6">
                    <button
                      className="px-6 py-4 bg-green-600 text-white rounded hover:bg-green-700 hover:shadow-lg outline-0 focus:outline-none"
                      onClick={editShow}
                    >
                      Edit Profile
                    </button>
                  </div>
                  <div className={showEdit ? "" : "hidden"}>
                    <div className="block md:flex justify-center flex-col items-center">
                      <div className="w-full md:w-3/5 p-8 bg-white shadow-md border-2 rounded">
                        <div className="rounded shadow p-6">
                          <div className="pb-6">
                            <label
                              for="name"
                              className="font-semibold text-gray-700 block pb-1"
                            >
                              Name
                            </label>
                            <div className="flex">
                              <input
                                id="username"
                                className="border-2 rounded px-4 py-2 w-full"
                                type="text"
                                defaultValue={userInfo.name}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="pb-4">
                            <label
                              for="phoneNumber"
                              className="font-semibold text-gray-700 block pb-1"
                            >
                              PhoneNumber
                            </label>
                            <input
                              id="phoneNumber"
                              className="border-2 rounded px-4 py-2 w-full"
                              type="number"
                              defaultValue={userInfo.phoneNumber}
                              autoComplete="off"
                              value={phonenumber}
                              onChange={(e) => setPhonenumber(e.target.value)}
                            />
                          </div>
                          <div className="pb-4">
                            <label
                              for="imageurl"
                              className="font-semibold text-gray-700 block pb-1"
                            >
                              Image Url
                            </label>
                            <input
                              id="imageurl"
                              className="border-2 rounded px-4 py-2 w-full"
                              type="text"
                              defaultValue={userInfo.imgurl}
                              value={imgurl}
                              onChange={(e) => setImgurl(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <button
                          className="ml-3 mt-5 px-6 py-4 bg-yellow-600 text-black rounded hover:bg-yellow-700 hover:shadow-lg outline-0 focus:outline-none"
                          onClick={editUser}
                          id="saveEdit"
                        >
                          Apply Changes
                        </button>
                      </div>
                    </div>
                  </div>
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
