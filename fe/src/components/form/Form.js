import React, { useEffect, useReducer, useState } from "react";
import "./style.css";

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

function FormComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [post, setPost] = useState([]);

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
    post.push(postObj);
    // window.localStorage.setItem("postKey", JSON.stringify(postObj));
  };

  return (
    <>
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
      {post.length !== 0 ? (
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
      ) : null}
    </>
  );
}

export default FormComponent;
