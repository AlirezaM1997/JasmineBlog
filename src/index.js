import React from "react";
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

import Home from "./Home";
import Header from "./component/Header";
// import Footer from "./component/Footer";
import SignIn from "./component/SignIn";
import SignUp from "./component/SignUp";
import About from "./component/About";
import Contact from "./component/Contact";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route element={<Header />}>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/user/signin" element={<SignIn />}></Route>
        <Route path="/user/signup" element={<SignUp />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
