import { useState } from "react";
import "./EditProfile.css";
import { Link, useNavigate } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import profile, { editprofile } from "../../service/Mainservice";
import { useEffect } from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import { useHeaderData } from "../../context/HeaderContext";

const Editprofile = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [error, seterror] = useState();
  const [loading, setloading] = useState(false);

  const [success, setsuccess] = useState();
  const [preview, setPreview] = useState();
  const [image, setImage] = useState();
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const { updateHeaderData } = useHeaderData();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profiledata = await profile();
        setData({
          email: profiledata.data.data.email,
          name: profiledata.data.data.username,
          profile_pic: profiledata.data.data.profile_pic,
        });
      } catch (error) {
        if (error.code === 401) {
          localStorage.clear();
          navigate("/");
        }
      }
    };
    fetchData();
  }, []);

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

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const imagehandle = (e) => {
    if (e.target && e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      console.log("No file selected");
    }
  };

  const handleEdit = async () => {
    setloading(true);
    try {
      const editdata = await editprofile(data, image);
      updateHeaderData({
        username: editdata.data.data.username,
        profile_pic: editdata.data.data.profile_pic,
      });
      setloading(false);

      setsuccess(editdata.data.message);
      setOpen2(true);
    } catch (error) {
      setloading(false);

      if (error.code === 401) {
        localStorage.clear();
        navigate("/");
      }
      seterror(error.message);
      setOpen(true);
    }
  };

  return (
    <>
      <div className="profileoptions">
        <li>
          <Link to="/Profile">Profile Info</Link>
        </li>
        <li className="active_profile">
          <Link to="/EditProfile">Update Profile</Link>
        </li>
        <li>
          <Link to="/ChangePassword">Change Password</Link>
        </li>
      </div>

      <div className="editdata">
        <div className="edit_profileimg">
          {preview ? (
            <img src={preview} alt="profile" className="editprofile_img" />
          ) : (
            <img
              src={data.profile_pic}
              alt="editprofile_image"
              className="editprofile_img"
            />
          )}

          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={imagehandle}
            name="profile_pic"
          />
          <label htmlFor="file" id="uploadbtn">
            <CameraAltIcon className="edit_cameraicn" />
          </label>
        </div>

        <div className="edit_input">
          <label className="Auth_label">Username</label>
          <br />

          <input
            onChange={handlechange}
            name="name"
            type="text"
            className="Auth_input"
            placeholder="Name"
            minLength={1}
            maxLength={30}
            value={data.name}
            required
          />
        </div>
        <div className="edit_input">
          <label className="Auth_label">Email</label>
          <br />

          <input
            onChange={handlechange}
            name="email"
            style={{ outline: "none" }}
            type="email"
            placeholder="Email"
            className="Auth_input"
            minLength={10}
            maxLength={50}
            value={data.email}
            readOnly
          />
        </div>
        <button className="edit_button" disabled={loading} onClick={handleEdit}>
          {loading ? "Loading...." : "Save"}
        </button>
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
    </>
  );
};
export default Editprofile;
