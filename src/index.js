import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Loading from "./component/Loading";

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
import Blog from "./component/Blog";
import UserBlog from "./component/UserBlog";
import CreateBlog from "./component/CreateBlog";
import EditUser from "./component/EditUser";
import EditBlog from "./component/EditBlog";
import Category from "./component/Category";
import Hashtag from "./component/Hashtag";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route exact path="" element={<Home />}></Route>
          <Route path="blog/:id" element={<Blog />}></Route>
          <Route path="userblog/:id" element={<UserBlog />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="contact" element={<Contact />}></Route>
          <Route path="category/:cat" element={<Category />}></Route>
          <Route path="hashtag/:hash" element={<Hashtag />}></Route>
          <Route
            path="user/signup"
            element={
              <CheckLogin redirectTo={"/user/dashboard"}>
                <SignUp />
              </CheckLogin>
            }
          ></Route>
          <Route
            path="user/login"
            element={
              <CheckLogin redirectTo={"/user/dashboard"}>
                <Login />
              </CheckLogin>
            }
          ></Route>
        </Route>

        <Route
          exact
          path="/user/dashboard"
          element={
            <RequireAuth redirectTo={"/user/login"}>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route
            path="/user/dashboard/createblog"
            element={<CreateBlog />}
          ></Route>
          <Route
            path="/user/dashboard/edituser"
            element={<EditUser />}
          ></Route>
          <Route
            path="/user/dashboard/editblog/:id"
            element={<EditBlog />}
          ></Route>
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  </Provider>
);

function RequireAuth({ children, redirectTo }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserInfo } = useAllState();
  const { userInfo } = useAllState();
  const { token } = useAllState();
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
        if (res && res._id) {
          setUserInfo(res);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  } else {
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
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
