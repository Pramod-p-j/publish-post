import React from "react";
// import "./main-screen-style.css";
import { useNavigate } from "react-router-dom";

function MainScreen() {
  let navigate = useNavigate();
  const signInRouteChange = () => {
    let signInPath = `signin`;
    navigate(signInPath);
  };
  const loginRouteChange = () => {
    let loginPath = `login`;
    navigate(loginPath);
  };
  return (
    <div className="container">
      <div className="main-screen-title">
        <span>Welcome &nbsp;</span>
        <span>To &nbsp;</span>
        <span>Write &nbsp;</span>
        <span>A &nbsp;</span>
        <span>Post</span>
      </div>
      <div className="navbar">
        <div className="loginBtn" onClick={loginRouteChange}>
          Login
        </div>
        <div className="signInBtn" onClick={signInRouteChange}>
          Sign In
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
