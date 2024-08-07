import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import logo from "../../assets/logo.png";
import { resetpassword } from "../../service/Authservice";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const ResetPassword = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);

  const [success, setsuccess] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const token = location.state.token;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleClose2 = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen2(false);
  };

  const handleReset = async (values) => {
    setloading(true);
    try {
      const data = await resetpassword(values.password, token);
      setsuccess(data.data.message);
      setOpen2(true);
      setTimeout(() => {
        navigate("/");
      }, 1000);
      setloading(false);
    } catch (error) {
      seterror(error.message);
      setOpen(true);
      setloading(false);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 6) {
      errors.password = "Must be at least 6 characters";
    } else if (values.password.length > 20) {
      errors.password = "Must be 20 characters or less";
    }
    if (!values.confirmpassword) {
      errors.confirmpassword = "Required";
    } else if (values.confirmpassword !== values.password) {
      errors.confirmpassword = "Password and Confirm Password must be same.";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    enableReinitialize: true,

    validate,
    onSubmit: (values) => {
      handleReset(values);
    },
  });

  return (
    <div className="App">
      <div className="Auth-form-container1">
        <div className="Auth-form1">
          <div className="Auth-logo">
            <img src={logo} className="logo_img" />
          </div>

          <div className="Auth-form-content1">
            <h3 className="Auth-form-title">Reset Password</h3>
            <form onSubmit={formik.handleSubmit} className="Auth_formdata">
              <br />
              <div className="form-group mt-3">
                <label className="Auth_label">Password</label>
                <input
                  type="text"
                  name="password"
                  className="Auth_input"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <p className="invalid">{formik.errors.password} </p>
                ) : null}
              </div>

              <br />
              <div className="form-group mt-3">
                <label className="Auth_label">Confirm Password</label>
                <input
                  type="text"
                  name="confirmpassword"
                  className="Auth_input"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.confirmpassword}
                />
                {formik.errors.confirmpassword ? (
                  <p className="invalid">{formik.errors.confirmpassword} </p>
                ) : null}
              </div>

              <br />
              <div style={{ display: "flex", justifyContent: "left" }}></div>
              <button
                type="submit"
                className="Auth_button"
                disabled={loading}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                {loading ? "Loading...." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose2}>
        <Alert variant="filled" severity="success">
          {success}
        </Alert>
      </Snackbar>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ResetPassword;
