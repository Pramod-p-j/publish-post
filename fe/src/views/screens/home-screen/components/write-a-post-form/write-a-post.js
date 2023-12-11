import React, { useReducer } from "react";
import "./write-a-post.css";
import postsServices from "../../../../../services/posts-services";

//defining actions
const SET_TITLE = "SET_TITLE";
const SET_DESCRIPTION = "SET_DESCRIPTION";

function reducer(state, action) {
  switch (action.type) {
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    default:
      return state;
  }
}

const initialState = {
  title: "",
  description: "",
};

function WriteAPost({ open }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const titleChangeHandler = (e) => {
    dispatch({ type: SET_TITLE, payload: e.target.value });
  };

  const descriptionHandler = (e) => {
    dispatch({ type: SET_DESCRIPTION, payload: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const { title, description } = state;
    dispatch({ type: SET_TITLE, payload: "" });
    dispatch({ type: SET_DESCRIPTION, payload: "" });
    const postObj = {
      postTitle: title,
      postDescription: description,
    };
    postsServices
      .createPost(postObj)
      .then((res) => res)
      .catch((err) => err);
  };

  return (
    <>
      {open && (
        <div className="formContainer">
          <form onSubmit={(e) => submitHandler(e)}>
            <div className="formFields">
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                value={state?.title}
                onChange={titleChangeHandler}
              ></input>
              <textarea
                rows={8}
                cols={40}
                placeholder="Description"
                value={state?.description}
                onChange={descriptionHandler}
              />
              <input type="submit" value="Submit" />
            </div>
          </form>
        </div>
      )}
      {/* {post.length !== 0 ? (
        <div className="postsContainer">
          <div style={{ position: "absolute", right: "200px" }}>
            <h1>PublishedPosts</h1>
            {post.map((item, index) => (
              <div style={{ marginTop: "10px" }} key={index}>
                <div>Title: {item?.postTitle}</div>
                <div>Description: {item?.postDescription}</div>
              </div>
            ))}
          </div>
        </div>
      ) : null} */}
    </>
  );
}

export default WriteAPost;
