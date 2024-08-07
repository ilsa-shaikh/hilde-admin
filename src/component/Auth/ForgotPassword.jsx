import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import logo from "../../assets/logo.png";
import { forgetpassword } from "../../service/Authservice";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const Handleforget = async (values) => {
    setloading(true);

    try {
      const data = await forgetpassword(values);
      navigate("/OTPverify", {
        state: {
          token: data.data.token,
        },
      });
      setloading(false);
    } catch (error) {
      setloading(false);
      setOpen(true);
      setError(error.message);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      Handleforget(values);
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
            <h3 className="Auth-form-title">Forgot Password</h3>
            <form onSubmit={formik.handleSubmit} className="Auth_formdata">
              <div className="form-group mt-3">
                <label className="Auth_label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="Auth_input"
                  placeholder="Enter Email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <p className="invalid">{formik.errors.email} </p>
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
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ForgotPassword;
