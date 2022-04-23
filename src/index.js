import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  Router,
} from "react-router-dom";
import Cookies from "universal-cookie";
import { useAllState } from "./Provider";
import Home from "./Home";
import Header from "./component/Header";
// import Footer from "./component/Footer";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import About from "./component/About";
import Contact from "./component/Contact";
import Dashboard from "./component/Dashboard";
import Provider from "./Provider";

// const LoadingSpinner = ()=>{
//   return <h2>Loading</h2>
// }
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/user/login" element={<Login />}></Route>
          <Route path="/user/signup" element={<SignUp />}></Route>
          <Route
            path="/user/dashboard"
            element={
              <RequireAuth redirectTo={"/user/login"}>
                <Dashboard />
              </RequireAuth>
            }
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);

function RequireAuth({ children, redirectTo }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const cookies = new Cookies();
  useEffect(() => {
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
        console.log(res);
        if (res.status === 200) {
          setIsAuthenticated(true);
          console.log(isAuthenticated);
        } else {
          setIsAuthenticated(false);
          console.log(isAuthenticated);
        }
      });
  }, []);
  console.log(isAuthenticated);

  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

reportWebVitals();
