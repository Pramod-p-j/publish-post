import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SnackbarProvider from "react-simple-snackbar";
import MainScreen from "./views/screens/main-screen/main-screen";
import SignInForm from "./views/screens/register-form/register-form";
import LoginForm from "./views/screens/login/login";
import HomeScreen from "./views/screens/home-screen/home-screen";
import useAuth from "./hooks/useAuth";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainScreen />} />
          <Route
            path="/signin"
            element={
              <SnackbarProvider>
                <SignInForm />
              </SnackbarProvider>
            }
          />
          <Route
            path="/login"
            element={
              <SnackbarProvider>
                <LoginForm />
              </SnackbarProvider>
            }
          />
          {/* <Route element={<ProtectedRoutes auth={isAuth} />}> */}
          <Route path="/home" element={<HomeScreen />} />
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
