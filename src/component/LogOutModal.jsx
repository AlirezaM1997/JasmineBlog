import Cookies from "universal-cookie";
import { useAllState } from "../Provider";

export default function LogOutModal(props) {
  const { setToken } = useAllState();
  const { setUserInfo } = useAllState();
  const cookies = new Cookies();
  const Logout = () => {
    props.setShowModal(true);
    cookies.remove("token");
    setToken("");
    setUserInfo();
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
                className="text-white font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" style={{background : 'black'}}
                onClick={() => props.setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="text-white font-bold uppercase text-sm px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button" style={{background : 'red'}}
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
}
