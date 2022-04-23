import { useAllState } from "../Provider";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  // const navToLogin = useNavigate()
  // const cookies = new Cookies();
  // console.log(cookies.get("token"));
  // const { token } = useAllState();
  // if (cookies.get("token") === token) {
    return (
      <>
        <h1>dashboard</h1>
       
      </>
    );
  // } else {
  //   // console.log("not loginnn");
  //   navToLogin('/user/login')
  // }

}

