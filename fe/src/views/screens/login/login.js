import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import authService from "../../../services/auth-service";
import { useSnackbar } from "react-simple-snackbar";

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

function LoginForm() {
  let navigate = useNavigate();
  const [openSnackBar, closeSnackBar] = useSnackbar(options);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      authService
        .loginUser(values)
        .then((res) => {
          if (res.status === 200) {
            resetForm({});
            openSnackBar("Login successfull", 2000);
            setTimeout(() => {
              navigate("/home");
            }, "2000");
          }
        })
        .catch((err) => err);
    },
  });

  const clickBackHandler = () => {
    let mainScreenPath = `/`;
    navigate(mainScreenPath);
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Username/Email</label>
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
        </div>
        <button
          type="submit"
          style={{ width: "120px" }}
          onClick={() => formik.submitForm()}
        >
          Login
        </button>
      </form>
      <h2 onClick={clickBackHandler}>Back</h2>
    </div>
  );
}

export default LoginForm;
