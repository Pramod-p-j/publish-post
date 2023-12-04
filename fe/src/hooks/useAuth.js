import React, { useState } from "react";

function useAuth(initialValue) {
  const [isAuth, setIsAuth] = useState(initialValue);

  function authenticateFunction() {
    setTimeout(() => {
      let token = window.localStorage.getItem("userToken");
      if (token) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    }, 1000);
  }
  return [isAuth, authenticateFunction];
}

export default useAuth;
