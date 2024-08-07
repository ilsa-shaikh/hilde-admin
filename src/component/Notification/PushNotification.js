import { useState } from "react";
import "./PushNotification.css";
import { useFormik } from "formik";
import { SendPushNftTo, SendPushNftToALl } from "../../service/Mainservice";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

const PushNotification = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();
  const [loading, setloading] = useState();
  const Navigate = useNavigate();

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

  const validate = (values) => {
    const errors = {};

    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length > 30) {
      errors.password = "Must be 30 characters or less";
    }
    if (!values.msg) {
      errors.msg = "Required";
    } else if (values.msg.length > 100) {
      errors.msg = "Must be 100 characters or less";
    } else if (values.msg.length < 2) {
      errors.msg = "Must be 2 characters or more";
    }

    return errors;
  };

  const SubmitHandler = async (values) => {
    console.log(id);
    setloading(true);
    try {
      const notification = id ? SendPushNftTo : SendPushNftToALl;
      const response = await notification(values, id);
      setsuccess(response.data.message);
      setOpen2(true);
      setloading(false);
    } catch (error) {
      setloading(false);
      seterror(error.message);
      setOpen(true);
      if (error.code === 401) {
        localStorage.clear();
        Navigate("/");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      msg: "",
    },
    validate,
    onSubmit: (values) => {
      SubmitHandler(values);
    },
  });

  return (
    <>
      <div className="container1">
        <h1 className="data_heading">Send Push Notification </h1>
        <form onSubmit={formik.handleSubmit}>
          <div className="notification_input_div">
            <label htmlFor="title" className="Auth_label">
              Title
            </label>

            <input
              type="text"
              className="notification_input"
              placeholder="Enter title.."
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.errors.title ? (
              <p className="invalid">{formik.errors.title} </p>
            ) : null}
          </div>
          <div className="notification_input_div">
            <label htmlFor="msg" className="Auth_label">
              Message
            </label>

            <textarea
              placeholder="Enter message.."
              className="notification_input"
              onChange={formik.handleChange}
              value={formik.values.msg}
              id="msg"
              cols={4}
              rows={3}
            />
            {formik.errors.msg ? (
              <p className="invalid">{formik.errors.msg} </p>
            ) : null}
          </div>

          <button
            className="interest_addbutton"
            type="submit"
            disabled={loading}
          >
            {loading ? "Sending......." : "Send"}
          </button>
        </form>
        <Snackbar
          open={open2}
          autoHideDuration={6000}
          onClose={handleClose2}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert variant="filled" severity="success">
            {success}
          </Alert>
        </Snackbar>
        <Snackbar
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Alert variant="filled" severity="error">
            {error}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};
export default PushNotification;
