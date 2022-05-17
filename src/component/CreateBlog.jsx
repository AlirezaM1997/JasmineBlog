import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "universal-cookie";
export default function CreateBlog(params) {
  const navToHome = useNavigate();

  const editorRef = useRef(null);

  const [hintTitle, setHintTitle] = useState(false);
  const [hintContent, setHintContent] = useState(false);

  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [cat, setCat] = useState("public");
  const [hashtags, setHashtags] = useState("");
  const [hashtagArr, setHashtagArr] = useState([]);

  const UID = () => {
    return new Date().getTime() + String(Math.random()).slice(3, 9);
  };

  const addHashtag = () => {
    if (hashtags !== "") {
      const arr = [...hashtagArr];
      arr.push({ name: hashtags, id: UID() });
      setHashtagArr(arr);
      setHashtags("");
    }
  };

  const getIndexById = (id) => {
    return hashtagArr.findIndex((item) => item.id === id);
  };

  const deleteHashtag = (id) => {
    const arr = [...hashtagArr]
    const p = getIndexById(id)
    arr.splice(p , 1)
    setHashtagArr(arr)
  };
  console.log(hashtagArr);

  const submitBLog = async () => {
    if (title === "") {
      setHintTitle(true);
    } else {
      setHintTitle(false);
    }
    if (editorRef.current.getContent() === "") {
      setHintContent(true);
    } else {
      setHintContent(false);
    }
    if (title !== "") {
      const cookie = new Cookies();
      fetch("http://localhost:4000/blog/write", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookie.get("token")}`,
        },
        body: JSON.stringify({
          cat: cat,
          hashtag:hashtagArr,
          title: title,
          content: editorRef.current.getContent(),
          imgurl:
            imgUrl === ""
              ? "https://www.bootdey.com/app/webroot/img/bg9.jpg"
              : imgUrl,
        }),
      }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          toast.info("Your post was successfully submitted");
          setTimeout(() => navToHome("/"), 3000);
        }
      });
    }
  };

  return (
    <>
      <div className="w-full h-full flex flex-col my-3 justify-center items-center">
        <div className="w-[95%]">
          <div className="">
            <label className="text-xl font-semibold">Title</label>
            <input
              className="w-full my-1 mb-3 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
              type="text"
              placeholder="some title"
              value={title}
              spellCheck="false"
              onChange={(e) => setTitle(e.target.value)}
            />
            <div
              className={`text-red-600 mb-3 pl-2 text-sm ${
                hintTitle ? "" : "hidden"
              }`}
            >
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{" "}
              Please type some title
            </div>
          </div>
          <div className="flex justify-start items-center my-1 mb-3 ">
            <div className="text-xl w-fit font-semibold mr-4">
              Select Category
            </div>
            <div className="w-1/2">
              <select
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="w-full p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
              >
                <option value="Public">Public</option>
                <option value="Fashion">Fashion</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Health">Health</option>
              </select>
            </div>
          </div>
          <div className="">
            <Editor
              className="border-2 border-gray-500"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
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
              className={`text-red-600 my-3 pl-2 text-sm ${
                hintContent ? "" : "hidden"
              }`}
            >
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>{" "}
              Please type some content
            </div>
          </div>
          <div className="mt-3">
            <label className="text-xl font-semibold">Image Url</label>
            <input
              className="w-full mb-3 mt-1 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
              type="text"
              placeholder="image url"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
            />
          </div>
          <div className="mt-3 flex items-center">
            <label className="text-xl font-semibold">Add Some Hashtag</label>
            <input
              className="w-1/2 md:mx-4 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder=""
            ></input>
            <button
              className="px-6 py-[0.5rem] bg-[#607027] text-white font-medium text-md leading-tight rounded shadow-md"
              onClick={() => addHashtag()}
            >
              Add
            </button>
          </div>
          <div className="mt-3 ">
            {hashtagArr.map((item, i) => (
              <div
                key={i}
                className="px-2 py-1 w-fit inline-block items-center border text-sm border-gray-500 text-black rounded transition-colors hover:bg-red-500"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold"># {item.name}</span>
                  <i
                    className="fa fa-times ml-1 p-2 cursor-pointer hover:text-white"
                    onClick={() => deleteHashtag(item.id)}
                    aria-hidden="true"
                  ></i>
                </div>
              </div>
            ))}
          </div>
          <div className="flex w-full justify-end mt-5">
            <button
              className="px-8 py-[0.75rem] bg-[#607027] text-white font-medium text-md leading-tight rounded shadow-md"
              onClick={submitBLog}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
