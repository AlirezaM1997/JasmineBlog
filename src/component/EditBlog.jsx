import React, { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
import Loading from "./Loading";
import { Editor } from "@tinymce/tinymce-react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditBlog() {
  const [hintTitle, setHintTitle] = useState(false);
  const [hintContent, setHintContent] = useState(false);

  const [postTitle, setPostTitle] = useState("");
  const [postImgUrl, setPostImgUrl] = useState("");
  const [postText, setPostText] = useState("");
  const [postCat, setPostCat] = useState("");

  const [loadingForEditPost, setLoadingForEditPost] = useState(true);
  const navToHome = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getPostForEdit = async () => {
      fetch(`http://localhost:4000/blog/single-blog/${id}`)
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
            setPostCat(res.cat);
          }
          setLoadingForEditPost(false);
        });
    };
    getPostForEdit();
  }, []);

  const [showSuccessEdit, setShowSuccessEdit] = useState(false);

  const editorRef = useRef(null);

  const submitBLogChange = async () => {
    if (postTitle === "") {
      setHintTitle(true);
    } else {
      setHintTitle(false);
    }
    if (editorRef.current.getContent() === "") {
      setHintContent(true);
    } else {
      setHintContent(false);
    }
    if (postTitle !== "") {
      const cookies = new Cookies();
      fetch("http://localhost:4000/blog/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("token")}`,
        },
        body: JSON.stringify({
          blogId: id,
          data: {
            cat: postCat,
            title: postTitle,
            content: editorRef.current.getContent(),
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
  return (
    <>
      {loadingForEditPost ? (
        <Loading />
      ) : (
        <div className="w-full h-full flex flex-col my-5 justify-center items-center">
          <div className="w-[95%]">
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
                className={`text-red-600 mb-3 pl-2 ${
                  hintTitle ? "" : "hidden"
                }`}
              >
                Please type some title
              </div>
            </div>
            <div className="flex justify-around items-center my-1 mb-3 ">
              <div className="text-2xl w-fit font-semibold">
                Select Category
              </div>
              <div className="w-1/2">
                <select
                  value={postCat}
                  onChange={(e) => setPostCat(e.target.value)}
                  className="w-full p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
                >
                  <option value="public">public</option>
                  <option value="fashion">fashion</option>
                  <option value="lifestyle">lifestyle</option>
                  <option value="health">health</option>
                </select>
              </div>
            </div>
            <div>
              <Editor
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={postText}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "a11ychecker",
                    "advlist",
                    "advcode",
                    "advtable",
                    "autolink",
                    "checklist",
                    "export",
                    "lists",
                    "link",
                    "image",
                    "charmap",
                    "preview",
                    "anchor",
                    "searchreplace",
                    "visualblocks",
                    "powerpaste",
                    "fullscreen",
                    "formatpainter",
                    "insertdatetime",
                    "media",
                    "table",
                    "help",
                    "wordcount",
                  ],
                  toolbar:
                    "undo redo | casechange blocks | bold italic backcolor | " +
                    "alignleft aligncenter alignright alignjustify | " +
                    "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                }}
              />
              <div
                className={`text-red-600 mb-3 ${hintContent ? "" : "hidden"}`}
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
              className="mt-3 px-8 py-[0.75rem] bg-[#607027] text-white font-medium text-md leading-tight rounded shadow-md"
              onClick={submitBLogChange}
            >
              Submit Changes
            </button>
            <Link
              to={"/user/dashboard"}
              className="mt-3 px-8 py-[0.75rem] bg-red-600 ml-6 text-white font-medium text-md leading-tight rounded shadow-md"
            >
              Cancel
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
