import React from "react";
import "./view-posts.css";

function PublishedPosts(props) {
  const { open, resultBasedOnSearch } = props;

  return (
    <>
      {open && (
        <div className="postsContainer">
          <h1>PublishedPosts</h1>
          {resultBasedOnSearch?.map((item, index) => (
            <div key={index} style={{ margin: "12px" }}>
              <div>
                <span style={{ fontWeight: "bolder" }}>Title:</span>
                {item?.postTitle}
              </div>
              <div>
                <span style={{ fontWeight: "bolder" }}>Description:</span>
                {item?.description}
              </div>
            </div>
          ))}
          {resultBasedOnSearch.length === 0 ? <div>No Posts found</div> : null}
        </div>
      )}
    </>
  );
}

export default PublishedPosts;
