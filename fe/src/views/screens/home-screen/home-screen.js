import React, { useState } from "react";
// import "./style.css";
import FormComponent from "../../../components/form/Form";
import PublishedPosts from "../../../components/posts/Posts";
import { useNavigate } from "react-router-dom";

function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [showPosts, setShowPosts] = useState(false);
  let navigate = useNavigate();
  const searchHandler = (e) => {
    setSearchText(e?.target?.value);
  };
  const clearBtnHandler = () => {
    setSearchText("");
  };

  const showPostComponentHandler = () => {
    setShowPosts(!showPosts);
  };

  const logoutHandler = () => {
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
      <FormComponent />
    </>
  );
}

export default HomeScreen;
