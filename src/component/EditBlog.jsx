export default function EditBlog(params) {
    
    const [postTitle, setPostTitle] = useState("");
    const [postImgUrl, setPostImgUrl] = useState("");
    const [postText, setPostText] = useState("");
  
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
      // if (contentState.blocks[0].text === "") {
      //   setHintContent(true);
      // } else {
      //   setHintContent(false);
      // }
      if (postTitle !== "") {
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
              // content: contentState.blocks[0].text,
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
    return(<></>
    
            // loadingForEditPost ? (
            //   <Loading />
            // ) : (
            //   <div>
            //     <div>
            //       <label className="text-2xl font-semibold">Title</label>
            //       <input
            //         className="w-full my-1 mb-3 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
            //         type="text"
            //         placeholder="title"
            //         value={postTitle}
            //         onChange={(e) => setPostTitle(e.target.value)}
            //       />
            //       <div
            //         className={`text-red-600 mb-3 pl-2 ${
            //           hintTitle ? "" : "hidden"
            //         }`}
            //       >
            //         Please type some title
            //       </div>
            //     </div>
            //     <div>
            //       <Editor
            //         onInit={(evt, editor) => (editorRef.current = editor)}
            //         initialValue="<p>This is the initial content of the editor.</p>"
            //         init={{
            //           height: 500,
            //           menubar: false,
            //           plugins: [
            //             "a11ychecker",
            //             "advlist",
            //             "advcode",
            //             "advtable",
            //             "autolink",
            //             "checklist",
            //             "export",
            //             "lists",
            //             "link",
            //             "image",
            //             "charmap",
            //             "preview",
            //             "anchor",
            //             "searchreplace",
            //             "visualblocks",
            //             "powerpaste",
            //             "fullscreen",
            //             "formatpainter",
            //             "insertdatetime",
            //             "media",
            //             "table",
            //             "help",
            //             "wordcount",
            //           ],
            //           toolbar:
            //             "undo redo | casechange blocks | bold italic backcolor | " +
            //             "alignleft aligncenter alignright alignjustify | " +
            //             "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help",
            //           content_style:
            //             "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            //         }}
            //       />
            //       <div
            //         className={`text-red-600 mb-3 ${
            //           hintContent ? "" : "hidden"
            //         }`}
            //       >
            //         Please type some content
            //       </div>
            //     </div>
            //     <div>
            //       <label className="text-2xl font-semibold">Image</label>
            //       <input
            //         className="w-full my-3 p-2 focus:bg-white focus:outline-none border border-blue-600 rounded-lg"
            //         type="text"
            //         placeholder="image url"
            //         value={postImgUrl}
            //         onChange={(e) => setPostImgUrl(e.target.value)}
            //       />
            //     </div>
            //     <button
            //       className="mt-3 px-6 py-4 bg-purple-600 text-white font-medium text-md leading-tight rounded shadow-md hover:bg-purple-700 hover:shadow-lg  focus:outline-none  active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
            //       onClick={submitBLogChange}
            //     >
            //       Submit Changes
            //     </button>
            //   </div>
            // )
         
    )
}