import React, { useEffect, useRef, useState } from "react";
import { useAllState } from "../Provider";
import { useNavigate } from "react-router-dom";

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import { convertToHTML } from "draft-convert";

import Cookies from "universal-cookie";
import Loading from "./Loading";
import SuccessModal from "./SuccessModal";
import LogOutModal from "./LogOutModal";

export default function Dashboard() {
  const { token } = useAllState();
  const { userInfo } = useAllState();
  const { setUserInfo } = useAllState();
  const navToHome = useNavigate();

  /////////////////////UI/////////////////////////
  const [state, setState] = useState({
    posts: true,
    account: false,
    newPost: false,
    editPost: false,
  });
  const clickHandler = (value) => {
    window.scrollTo(0, 0);
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

  /////////////////////SUBMIT BLOG/////////////////////////
  const editor = useRef(null);
  const [hintTitle, setHintTitle] = useState(false);
  const [hintContent, setHintContent] = useState(false);

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
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };
  console.log("convertedContent:", convertedContent);
  // console.log("title:", title);
  // console.log("imgUrl:", imgUrl);

  const [showSuccessSubmit, setShowSuccessSubmit] = useState(false);
  const submitBLog = async () => {
    if (title === "") {
      setHintTitle(true);
    } else {
      setHintTitle(false);
    }
    if (convertedContent === null) {
      setHintContent(true);
    } else {
      setHintContent(false);
    }
    if (title !== "" && convertedContent !== null) {
      const cookie = new Cookies();
      fetch("http://localhost:4000/blog/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookie.get("token")}`,
        },
        body: JSON.stringify({
          title: title,
          content: convertedContent,
          imgurl:
            imgUrl === ""
              ? "https://www.bootdey.com/app/webroot/img/bg9.jpg"
              : imgUrl,
        }),
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          setShowSuccessSubmit(true);
          setTimeout(() => navToHome("/"), 2000);
        }
      });
    }
  };

  /////////////////////EDIT BLOG/////////////////////////
  const [postTitle, setPostTitle] = useState("");
  const [postImgUrl, setPostImgUrl] = useState("");
  const [postText, setPostText] = useState("");

  const [contentState, setContentState] = useState(convertToRaw(ContentState.createFromText(postText)));

  const [loadingForEditPost, setLoadingForEditPost] = useState(true);

  const getPostForEdit = async (id) => {
    fetch(`http://localhost:4000/blog/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error(response.status);
        }
      })
      .then((res) => {
        if (res) {
          // console.log(res);
          setPostTitle(res.title);
          setPostImgUrl(res.imgurl);
          setPostText(res.content);
        }
        // console.log(postText);
        setContentState(convertToRaw(ContentState.createFromText(postText)));
        setLoadingForEditPost(false);
      });
  };


  const [currentPostId, setCurrentPostId] = useState();
  const [showSuccessEdit, setShowSuccessEdit] = useState(false);

  const submitBLogChange = async () => {
    if (postTitle === "") {
      setHintTitle(true);
    } else {
      setHintTitle(false);
    }
    if (contentState.blocks[0].text === "") {
      setHintContent(true);
    } else {
      setHintContent(false);
    }
    if (postTitle !== "" && contentState.blocks[0].text !== "") {
      const cookies = new Cookies();
      fetch("http://localhost:4000/blog/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("token")}`,
        },
        body: JSON.stringify({
          blogId: currentPostId,
          data: {
            title: postTitle,
            content: contentState.blocks[0].text,
            imgurl:
              postImgUrl === ""
                ? "https://www.bootdey.com/app/webroot/img/Content/bg1.jpg"
                : postImgUrl,
          },
        }),
      }).then(() => {
        setShowSuccessEdit(true);
        setTimeout(() => navToHome("/"), 2000);
      });
    }
  };

  /////////////////////RENDER DASHBOARD/////////////////////////
  const [myBlogs, setMyBlogs] = useState();
  const [loading, setLoading] = useState(true);
  // console.log(myBlogs);
  const cookies = new Cookies();
  useEffect(() => {
    fetch(`http://localhost:4000/blog/my-blogs`, {
      method: "POST",
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
        // console.log(result);
        setMyBlogs(result);
        setLoading(false);
      });
  }, []);

  const htmlToText = (html) => {
    let temp = document.createElement("div");
    temp.innerHTML = html;
    return temp.textContent;
  };

  /////////////////////EDIT USER/////////////////////////
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
      console.log("editUser done!");
    });
    updateUser();
  };

  const [showModal, setShowModal] = useState(false);

  /////////////////////JSX/////////////////////////
  return (
    <>
      <div className="w-full bg-white relative flex ">
        <aside className="fixed h-full w-16 flex flex-col space-y-10 items-center justify-center bg-gray-800 text-white">
          <div
            onClick={() => clickHandler("posts")}
            className={`h-10 w-full flex items-center justify-center rounded-l cursor-pointer duration-300 ${
              state.posts || state.editPost
                ? "text-gray-800 bg-white duration-300 ease-linear"
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
                class="fa fa-home text-white hover:text-green-300 cursor-pointer homeIcon"
                aria-hidden="true"
                onClick={() => navToHome("/")}
              ></i>
            </div>
            <div>
              {" "}
              <button
                type="button"
                className="bg-gray-800 p-1 rounded-full text-white hover:text-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
              {state.posts || state.editPost ? (
                <h5 className="text-3xl font-bold border-b-2">
                  <span
                    onClick={() => clickHandler("posts")}
                    className={`${
                      state.editPost ? "text-blue-700 cursor-pointer" : ""
                    }`}
                  >
                    All Posts
                  </span>
                  <span className={`${state.editPost ? "" : "hidden"}`}>
                    {" "}
                    &gt; Edit Post
                  </span>
                </h5>
              ) : state.newPost ? (
                <h5 className="text-3xl font-bold border-b-2">
                  Add a New Post
                </h5>
              ) : state.account ? (
                <h5 className="text-3xl font-bold border-b-2">Account</h5>
              ) : (
                ""
              )}
            </div>
            <div className="h-full w-full flex flex-wrap">
              {state.posts ? (
                loading ? (
                  <Loading />
                ) : (
                  <section className="text-gray-600 body-font w-full">
                    <div className="container px-12 py-10 mx-auto">
                      <div className="flex flex-wrap -m-4">
                        {myBlogs.map((item) => (
                          <div className="p-4 sm:w-full w-full dashboardCard">
                            <div className="h-full shadow-lg rounded-xl shadow-cla-blue bg-gradient-to-r from-indigo-50 to-blue-50 overflow-hidden">
                              <img
                                className="w-full h-60 object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
                                src={item.imgurl} style={{height:'15rem'}}
                                alt="blog"
                              />
                              <div className="py-3 px-4">
                                <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                  February 06, 2017
                                </h2>
                                <h1 className="title-font text-lg font-medium text-gray-600 mb-3">
                                  {item.title}
                                </h1>
                                <p className="leading-relaxed mb-3 overflow-hidden truncate whitespace-nowrap">
                                  {item.content}
                                </p>
                                <div className="flex items-center justify-center flex-wrap ">
                                  <button
                                    className="px-8 py-2 w-2/6 bg-teal-500 text-white hover:bg-teal-600 transition-all duration-300 rounded-lg"
                                    onClick={(e) => {
                                      clickHandler("editPost");
                                      getPostForEdit(item._id);
                                      setCurrentPostId(item._id);
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
                )
              ) : (
                ""
              )}
              {state.editPost ? (
                loadingForEditPost ? (
                  <Loading />
                ) : (
                  <div>
                    <div>
                      <label className="text-2xl font-semibold">Title</label>
                      <input
                        className="w-full my-1 mb-3 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
                        type="text"
                        placeholder="title"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                      />
                      <div
                        className={`text-red-600 mb-3 ${
                          hintTitle ? "" : "hidden"
                        }`}
                      >
                        Please type some title
                      </div>
                    </div>
                    <div>
                      <Editor
                        defaultContentState={contentState}
                        onContentStateChange={setContentState}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        placeholder={"Type something here ..."}
                      />
                      <div
                        className={`text-red-600 mb-3 ${
                          hintContent ? "" : "hidden"
                        }`}
                      >
                        Please type some content
                      </div>
                    </div>
                    <div>
                      <label className="text-2xl font-semibold">Image</label>
                      <input
                        className="w-full my-3 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
                        type="text"
                        placeholder="image url"
                        value={postImgUrl}
                        onChange={(e) => setPostImgUrl(e.target.value)}
                      />
                    </div>
                    <button
                      className="mt-3 px-6 py-4 bg-purple-600 text-white font-medium text-md leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg  focus:outline-none  active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                      onClick={submitBLogChange}
                    >
                      Submit Changes
                    </button>
                  </div>
                )
              ) : (
                ""
              )}
              {state.newPost ? (
                <div>
                  <div className="mt-3">
                    <label className="text-2xl font-semibold">Title</label>
                    <input
                      className="w-full  my-1 mb-3 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
                      type="text"
                      placeholder="some title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <div
                      className={`text-red-600 mb-3 ${
                        hintTitle ? "" : "hidden"
                      }`}
                    >
                      Please type some title
                    </div>
                  </div>
                  <div>
                    <Editor
                      // ref={editor}
                      editorState={editorState}
                      onEditorStateChange={handleEditorChange}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      placeholder={"Type something here ..."}
                    />
                    <div
                      className={`text-red-600 mb-3 ${
                        hintContent ? "" : "hidden"
                      }`}
                    >
                      Please type some content
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-2xl font-semibold">Image</label>
                    <input
                      className="w-full mb-3 mt-1 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
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
            {showModal ? <LogOutModal setShowModal={setShowModal} /> : null}
            {showSuccessSubmit || showSuccessEdit ? (
              <SuccessModal showSuccessSubmit={showSuccessSubmit} />
            ) : null}
          </main>
        </div>
      </div>
    </>
  );
}
