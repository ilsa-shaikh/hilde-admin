import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { changepassword } from "../../service/Mainservice";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useState } from "react";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();
  const navigate = useNavigate();

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
    try {
      const data = await changepassword(values);
      setsuccess(data.data.message);
      setOpen2(true);
    } catch (error) {
      if (error.code === 401) {
        localStorage.clear();
        navigate("/");
      }
      seterror(error.message);
      setOpen(true);
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
      oldpassword: "",
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
    <div>
      <div className="profileoptions">
        <li>
          <Link to="/Profile">Profile Info</Link>
        </li>
        <li>
          <Link to="/EditProfile">Update Profile</Link>
        </li>
        <li className="active_profile">
          <Link to="/ChangePassword">Change Password</Link>
        </li>
      </div>

      <div className="editdata">
        <div className="Auth-form-content1">
          <h3 className="Auth-form-title">Change Password</h3>
          <form onSubmit={formik.handleSubmit} className="Auth_formdata">
            <br />
            <div className="form-group mt-3">
              <label className="Auth_label">Old Password</label>
              <input
                type="text"
                name="oldpassword"
                className="Auth_input"
                placeholder="Enter password"
                onChange={formik.handleChange}
                value={formik.values.oldpassword}
              />
              {formik.errors.oldpassword ? (
                <p className="invalid">{formik.errors.oldpassword} </p>
              ) : null}
            </div>

            <br />
            <div className="form-group mt-3">
              <label className="Auth_label">New Password</label>
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
              className="edit_button"
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Submit
            </button>
          </form>
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

export default ChangePassword;
