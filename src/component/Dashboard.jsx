import React, { useRef, useState } from "react";
import { useAllState } from "../Provider";

import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function Dashboard() {
  const { userInfo } = useAllState();
  const [state, setState] = useState({
    posts: true,
    setting: false,
    newPost: false,
  });
  const clickHandler = (value) => {
    setState({
      posts: false,
      setting: false,
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

  return (
    <>
      <div className="h-screen w-full bg-white relative flex overflow-hidden">
        <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-gray-800 text-white">
          <div
            onClick={() => clickHandler("posts")}
            className={`h-10 w-full flex items-center justify-center rounded-l cursor-pointer ${state.posts?'text-gray-800 bg-white  duration-300 ease-linear':''} `}
          >
            <i className="h-6 w-6 flex fa fa-sticky-note" aria-hidden="true"></i>
          </div>

          <div
            onClick={() => clickHandler("newPost")}
            className={`h-10 w-full flex items-center justify-center rounded-l cursor-pointer ${state.newPost?'text-gray-800 bg-white  duration-300 ease-linear':''} `}
          >
            <i
              className="h-6 w-6 flex fa fa-pencil-square-o"
              aria-hidden="true"
            ></i>
          </div>

          {/* <div className="h-10 w-full flex items-center justify-center rounded-l cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
            <i className="h-6 w-6 flex fa fa-sticky-note" aria-hidden="true"></i>
          </div> */}

          <div
            onClick={() => clickHandler("setting")}
            className={`h-10 w-full flex items-center justify-center rounded-l cursor-pointer ${state.setting?'text-gray-800 bg-white  duration-300 ease-linear':''} `}
          >
            <i className="h-6 w-6 flex fa fa-user-circle-o" aria-hidden="true"></i>
          </div>
        </aside>

        <div className="w-full h-full flex flex-col justify-between">
          <header className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
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
              ) : state.setting ? (
                <h5 className="text-3xl font-bold">Your Account</h5>
              ) : (
                ""
              )}
            </div>
            <div className="h-full w-full flex flex-wrap my-4">
              {state.newPost ? (
                <Editor
                  // editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  // onEditorStateChange={this.onEditorStateChange}
                />
              ) : (
                ""
              )}
              
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
