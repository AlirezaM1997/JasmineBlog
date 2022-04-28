import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAllState } from "./Provider";
import Home from "./Home";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import About from "./component/About";
import Contact from "./component/Contact";
import Dashboard from "./component/Dashboard";
import Provider from "./Provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route element={<Header />}>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route
            path="/user/signup"
            element={
              <CheckLogin redirectTo={"/user/dashboard"}>
                <SignUp />
              </CheckLogin>
            }
          ></Route>
          <Route
            path="/user/login"
            element={
              <CheckLogin redirectTo={"/user/dashboard"}>
                <Login />
              </CheckLogin>
            }
          ></Route>
        </Route>

        <Route
          path="/user/dashboard"
          element={
            <RequireAuth redirectTo={"/user/login"}>
              <Dashboard />
            </RequireAuth>
          }
        ></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </Provider>
);

function RequireAuth({ children, redirectTo }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserInfo } = useAllState();
  const { token } = useAllState();
  // const cookies = new Cookies();
  useEffect(() => {
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
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="bg-gray-400 p-4 text-center w-1/4 mx-auto rounded-3xl text-white mt-10 text-lg">
        <p>Please wait ....</p>
        <i className="block fa fa-circle-o-notch fa-spin"></i>
      </div>
    );
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

function CheckLogin({ children, redirectTo }) {
  const [isLogin, setIsLogin] = useState(false);
  const { token } = useAllState();
  useEffect(() => {
    fetch("http://localhost:4000/user/me", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: `ut ${token}`,
      },
      body: JSON.stringify({}),
    }).then((data) => {
      if (data.status === 200) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  return !isLogin ? children : <Navigate to={redirectTo} />;
}

reportWebVitals();
