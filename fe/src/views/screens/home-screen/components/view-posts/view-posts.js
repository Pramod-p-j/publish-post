import React, { useEffect, useState } from "react";
import "./view-posts.css";

function PublishedPosts(props) {
  const { open } = props;
  const [postObj, setPostObj] = useState({});

  // useEffect(() => {
  //   setPostObj(window.localStorage.getItem("postKey"));
  // }, [posts]);

  return (
    <>
      {open && (
        <div className="postsContainer">
          <div style={{ position: "absolute", right: "200px" }}>
            <h1>PublishedPosts</h1>
            <div>Title: {postObj?.postTitle}</div>
            <div>Description: {postObj?.postDescription}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default PublishedPosts;
