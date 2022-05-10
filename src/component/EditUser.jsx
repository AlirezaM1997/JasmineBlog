import React, { useEffect, useRef, useState } from "react";
import { useAllState } from "../Provider";
import SuccessModal from "./SuccessModal";
import LogOutModal from "./LogOutModal";
export default function EditUser(props) {
  const { userInfo } = useAllState();
  const { setUserInfo } = useAllState();
  const { token } = useAllState();

  const [name, setName] = useState(userInfo.name);
  const [phonenumber, setPhonenumber] = useState(userInfo.phoneNumber);
  const [imgurl, setImgurl] = useState(userInfo.imgurl);

  const [showModal, setShowModal] = useState(false);
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
  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 hover:shadow-lg outline-0 focus:outline-none"
          //   onClick={() => setShowModal(true)}
        >
          Log Out
          <i class="fa fa-sign-out ml-3" aria-hidden="true"></i>
        </button>
      </div>

      <div className="flex justify-center my-6"></div>
      <div className="">
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
      {showModal ? <LogOutModal setShowModal={setShowModal} /> : null}
      {/* {showSuccessSubmit || showSuccessEdit ? (
        <SuccessModal showSuccessSubmit={showSuccessSubmit} /> */}
      {/* ) : null} */}
    </>
  );
}
