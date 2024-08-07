import { useState } from "react";
import { useEffect } from "react";

import Loader from "../../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import { sendreply, contactdetails } from "../../service/Mainservice";
import "./ContactDetails.css";
import { Modal } from "@mui/material";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";

const ContactDetails = () => {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  const [msg, setmsg] = useState();
  const [reply, setreply] = useState(false);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [error, setError] = useState();
  const [success, setsuccess] = useState();
  const Navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;

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

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, []);
  const getData = async (id) => {
    try {
      const response = await contactdetails(id);
      console.log(response.data.data);
      setData(response.data.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      if (error.code === 401) {
        localStorage.clear();
        Navigate("/");
      }
    }
  };
  const sendreplymsg = async () => {
    try {
      const response = await sendreply(data.user_id, data.user_email, msg);
      console.log(response);
      getData(id);
      setTimeout(() => {
        setreply(false);
      }, 1000);
      setOpen(true);
      setsuccess(response.data.data.message);
      setloading(false);
    } catch (error) {
      setloading(false);
      setError(error.message);
      setOpen2(true);
      if (error.code === 401) {
        localStorage.clear();
        Navigate("/");
      }
    }
  };
  return (
    <>
      <h1 className="userdetails_heading">Contact Details </h1>
      <div className="userdetails">
        <div className="userdetails_down">
          <p className="userdata">
            Date Created: <span>{data.contact_us_date_created}</span>
          </p>
          <p className="userdata">
            Title: <span>{data.contact_us_title}</span>
          </p>
          <p className="userdata">
            Message: <span>{data.contact_us_message}</span>
          </p>

          <p className="userdata">
            Read:{" "}
            {data.contact_us_is_read ? (
              <span className="complete_data">Yes</span>
            ) : (
              <span className="cancel_data">No</span>
            )}
          </p>

          <p className="userdata">
            Reply:{" "}
            {data.contact_us_is_reply ? (
              <span className="complete_data">Yes</span>
            ) : (
              <span className="cancel_data">No</span>
            )}
          </p>
          {data.contact_us_is_reply ? (
            <>
              <p className="userdata">
                Reply Date: <span>{data.contact_us_reply_date}</span>
              </p>
              <p className="userdata">
                Reply Message: <span>{data.contact_us_reply_msg}</span>
              </p>
            </>
          ) : (
            <button
              className="interest_addbutton"
              onClick={() => setreply(true)}
            >
              Send Reply
            </button>
          )}
        </div>
        <div className="userdetails_down">
          <h1 className="userdetails_title">User</h1>
          <p className="userdata">
            Name: <span>{data.user_full_name}</span>
          </p>

          <p className="userdata">
            Phone Mumber:{" "}
            <span>+{data.user_country_code + data.user_phone_number}</span>
          </p>
          <p className="userdata">
            Email: <span>{data.user_email}</span>
          </p>
          <p className="userdata">
            Gender:{" "}
            <span>{data.contacted_user_gender === 1 ? "Male" : "Female"}</span>
          </p>
        </div>
      </div>
      <Modal open={reply} onClose={() => setreply(false)}>
        <div className="modalinterest">
          <h1 className="data_heading">Send Reply</h1>
          <label htmlFor="email">User Email </label>
          <br />
          <input
            type="text"
            className="inputreply"
            placeholder="Enter Interest.."
            id="email"
            value={data.user_email}
            readOnly
          />
          <label htmlFor="message">Enter Message </label>
          <br />
          <textarea
            className="inputreply"
            id="message"
            value={msg}
            onChange={(e) => setmsg(e.target.value)}
          />
          <button className="interest_addbutton" onClick={sendreplymsg}>
            Send Reply
          </button>
        </div>
      </Modal>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert variant="filled" severity="success">
          {success}
        </Alert>
      </Snackbar>

      <Snackbar open={open2} autoHideDuration={1500} onClose={handleClose2}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>

      {loading && <Loader />}
    </>
  );
};
export default ContactDetails;
