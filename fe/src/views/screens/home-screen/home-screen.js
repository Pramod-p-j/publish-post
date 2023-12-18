import React, { useEffect, useState } from "react";
// import "./style.css";
import WriteAPost from "./components/write-a-post-form/write-a-post";
import PublishedPosts from "./components/view-posts/view-posts";
import { useLocation, useNavigate, useParams, NavLink } from "react-router-dom";
import postsServices from "../../../services/posts-services";

function HomeScreen() {
  const location = useLocation();
  const params = useParams();

  const [searchText, setSearchText] = useState("");
  const [showPosts, setShowPosts] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [resultBasedOnSearch, setResultBasedOnSearch] = useState([]);
  let navigate = useNavigate();
  const searchHandler = (e) => {
    setSearchText(e?.target?.value);
  };
  const clearBtnHandler = () => {
    setSearchText("");
  };

  const showFormComponentHandler = () => {
    setOpenForm(!openForm);
    if (showPosts) setShowPosts(!showPosts);
  };

  const showPostComponentHandler = () => {
    setShowPosts(!showPosts);
    if (openForm) setOpenForm(!openForm);
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("userToken");
    window.localStorage.removeItem("_user");
    navigate("/");
  };

  const getPosts = () => {
    postsServices
      .fetchPosts({ searchVal: searchText })
      .then((res) => setResultBasedOnSearch(res.data.fetchedPosts))
      .catch((err) => err);
  };

  useEffect(() => {
    getPosts();
  }, [searchText, openForm]);

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
        <div className="navBar">
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
        </div>
        <div onClick={logoutHandler}>Logout</div>
      </div>
      <PublishedPosts
        open={showPosts}
        resultBasedOnSearch={resultBasedOnSearch}
      />
      <WriteAPost open={openForm} />
    </>
  );
}

export default HomeScreen;
