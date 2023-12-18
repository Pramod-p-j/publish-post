import { useFormik } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import registerServices from "../../../services/register-services";
import { useSnackbar } from "react-simple-snackbar";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const options = {
  position: "top-center",
  style: {
    backgroundColor: "midnightblue",
    border: "2px solid lightgreen",
    color: "lightblue",
    fontFamily: "Menlo, monospace",
    fontSize: "20px",
    textAlign: "center",
  },
  closeStyle: {
    color: "lightcoral",
    fontSize: "16px",
  },
};

function SignInForm(props) {
  const [openSnackBar, closeSnackBar] = useSnackbar(options);
  let navigate = useNavigate();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const validationSchema = yup.object({
    fullName: yup.string().required("Full Name is required"),
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone Number is required"),
  });

  const formik = useFormik({
    initialValues: { fullName: "", email: "", password: "", phoneNumber: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      registerServices
        .registerNewUser({ values })
        .then((res) => {
          if (res.status === 200) {
            resetForm({});
            openSnackBar("user added successfully", 2000);
          } else {
            openSnackBar("Something went wrong Try again later", 1500);
          }
        })
        .catch((err) => err);
    },
  });

  const googleSignUpSuccessHandler = (credentialResponse) => {
    const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
    registerServices
      .googleSignUpUser(credentialResponseDecoded)
      .then((res) => {
        if (res.status === 200) {
          openSnackBar("Registered successfull", 2000);
          setTimeout(() => {
            navigate("/login");
          }, "1500");
        } else {
          openSnackBar("Something went wrong Try again later", 1500);
        }
      })
      .catch((err) => console.log(err));
  };

  const googleSingUpErrorHandler = () => {
    alert("Sign Up failed Try again");
  };

  const clickBackHandler = () => {
    let mainScreenPath = `/`;
    navigate(mainScreenPath);
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="fullName"
            name="fullName"
            value={formik.values.fullName}
            onChange={formik.handleChange}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <div className="error-msg">{formik.errors.fullName}</div>
          )}
          <br />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error-msg">{formik.errors.email}</div>
          )}
          <br />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.touched.password && formik.errors.password && (
            <div className="error-msg">{formik.errors.password}</div>
          )}
          <br />
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="number"
            name="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <div className="error-msg">{formik.errors.phoneNumber}</div>
          )}
          <br />
        </div>
        <button type="submit" style={{ width: "120px" }}>
          Register
        </button>
        <GoogleLogin
          onSuccess={googleSignUpSuccessHandler}
          onError={googleSingUpErrorHandler}
        />
      </form>
      <h2 onClick={clickBackHandler}>Back</h2>
    </div>
  );
}

export default SignInForm;
