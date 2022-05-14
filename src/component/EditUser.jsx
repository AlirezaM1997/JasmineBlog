import React, { useEffect, useRef, useState } from "react";
import { useAllState } from "../Provider";
import SuccessModal from "./SuccessModal";
import LogOutModal from "./LogOutModal";

import Cookies from "universal-cookie";

export default function EditUser(props) {
  const { userInfo } = useAllState();
  const { setUserInfo } = useAllState();
  const { token } = useAllState();

  const [name, setName] = useState(userInfo.name);
  const [bio, setBio] = useState(userInfo.bio);
  const [imgurl, setImgurl] = useState(userInfo.imgurl);

  const cookies = new Cookies();

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const updateUser = async () => {
      fetch("http://localhost:4000/user/me", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: `ut ${cookies.get("token")}`,
        },
        body: JSON.stringify({}),
      })
        .then((data) => {
          return data.json();
        })
        .then((res) => {
          //   console.log(res);
          if (res && res._id) {
            setUserInfo(res);
            // console.log(userInfo);
          }
        });
    };
    updateUser();
  }, []);

  const editUser = async () => {
    fetch("http://localhost:4000/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        data: {
          name: name,
          bio: bio,
        },
      }),
    }).then((res) => {
      console.log(res);
      console.log("editUser done!");
    });
  };

  const [file, setFile] = useState(null);
  const submitAvatar = async () => {
    try {
      if (!file) return;

      console.log(file);

      const formData = new FormData();
      formData.append("avatar", file);

      fetch("http://localhost:4000/user/update-avatar", {
        method: "POST",
        headers: {
          auth: `ut ${cookies.get("token")}`,
        },
        body: formData,
      }).then((res) => {
        console.log(res);
      });
    } catch (error) {
      console.log("lol");
    }
  };

  return (
    <>
      <div className="my-5">
        <div className="block md:flex justify-center flex-col items-center">
          <div className="w-full md:w-3/5 p-8 shadow-md bg-[#eee] rounded">
            <div className="rounded shadow p-6 bg-white border-[1px] border-[#607027]">
              <div>
                <div
                  className="wrapperPicture"
                  id="wrapperPictureId"
                  style={{
                    background: `url(${imgurl})`,
                  }}
                >
                  <input
                    placeholder="هیچ فایلی انتخاب نشده است"
                    accept="image/*"
                    type="file"
                    id="picture"
                    value={file}
                    onChange={(e) => setFile(e.target.files[0])}
                    className="form-control pictureFile"
                    // onInput={(e) => onInputClick(e)}
                  />
                </div>
              </div>
              <div className="pb-6">
                <label
                  for="name"
                  className="font-semibold text-sm text-gray-700 block pb-1"
                >
                  Name
                </label>
                <div className="flex">
                  <input
                    id="username"
                    className="border-2 rounded p-2 w-full focus:bg-inherit outline-none"
                    autoComplete="off"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    spellCheck="false"
                  />
                </div>
              </div>
              <div className="pb-4">
                <label
                  for="phoneNumber"
                  className="font-semibold text-sm text-gray-700 block pb-1"
                >
                  Bio
                </label>
                <input
                  id="phoneNumber"
                  className="border-2 rounded p-2 w-full focus:bg-inherit outline-none"
                  autoComplete="off"
                  type="number"
                  autoComplete="off"
                  value={bio}
                  spellCheck="false"
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              {/* <div className="pb-4">
                <label
                  for="imageurl"
                  className="font-semibold text-gray-700 block pb-1"
                >
                  Image Url
                </label>
                <input
                  id="imageurl"
                  className="border-2 rounded p-2 w-full focus:bg-inherit outline-none"
                  autoComplete="off"
                  type="text"
                  value={imgurl}
                  spellCheck="false"
                  onChange={(e) => setImgurl(e.target.value)}
                />
              </div> */}
            </div>
          </div>
          <div>
            <button
              className="ml-3 mt-5 px-4 py-2 bg-[#607027] text-white text-sm rounded outline-0 focus:outline-none"
              onClick={editUser}
              id="saveEdit"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
      {showModal ? <LogOutModal setShowModal={setShowModal} /> : null}
      {/* {showSuccessSubmit || showSuccessEdit ? (
        <SuccessModal showSuccessSubmit={showSuccessSubmit} /> */}
      {/* ) : null} */}
    </>
  );
}

// const onInputClick = (event) => {
//   document.getElementById(
//     "wrapperPictureId"
//   ).style.background = `url(${event.target.value})`;
//   console.log(event);
// };
