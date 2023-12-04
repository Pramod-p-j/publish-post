import React, { useState } from "react";
// import "./style.css";
import WriteAPost from "./components/write-a-post-form/write-a-post";
import PublishedPosts from "./components/view-posts/view-posts";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function HomeScreen() {
  const location = useLocation();
  const params = useParams();

  const [searchText, setSearchText] = useState("");
  const [showPosts, setShowPosts] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  let navigate = useNavigate();
  const searchHandler = (e) => {
    setSearchText(e?.target?.value);
  };
  const clearBtnHandler = () => {
    setSearchText("");
  };

  const showFormComponentHandler = () => {
    // setShowPosts(!showPosts);
    setOpenForm(!openForm);
  };

  const showPostComponentHandler = () => {
    setShowPosts(!showPosts);
    // setOpenForm(!openForm);
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <>
      <div className="container">
        <div className="searchContainer">
          <input
            autoComplete="off"
            className="searchField"
            type="text"
            name="search"
            id="search"
            placeholder="Search Posts"
            value={searchText}
            onChange={(e) => searchHandler(e)}
          ></input>
          <button onClick={clearBtnHandler}>X</button>
        </div>
        <div className="writeBtn" onClick={showFormComponentHandler}>
          Write
        </div>
        <div
          className="postBtn"
          type="button"
          onClick={showPostComponentHandler}
        >
          Posts
        </div>
        <div onClick={logoutHandler}>Logout</div>
      </div>
      <PublishedPosts open={showPosts} />
      <WriteAPost open={openForm} />
    </>
  );
}

export default HomeScreen;
