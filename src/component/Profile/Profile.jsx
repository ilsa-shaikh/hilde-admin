import React from "react";
import { Divider } from "@mui/material";
import profile from "../../service/Mainservice";
import { useEffect } from "react";
import { useState } from "react";
import "./Profile.css";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {
  const [profiledata, setprofiledata] = useState({});
  const { username, email, profile_pic } = profiledata;

  const navigate = useNavigate();
  useEffect(() => {
    getprofile();
  }, []);

  const getprofile = async () => {
    try {
      const data = await profile();
      console.log(data.data.data);
      setprofiledata(data.data.data);
    } catch (error) {
      if (error.code === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };
  return (
    <>
      <div className="profileoptions">
        <li className="active_profile">
          <Link to="/Profile">Profile Info</Link>
        </li>
        <li>
          <Link to="/EditProfile">Update Profile</Link>
        </li>
        <li>
          <Link to="/ChangePassword">Change Password</Link>
        </li>
      </div>

      <div className="profiledata">
        <div className="profiledata_up" />
        <img className="profileimg" alt="profile" src={profile_pic} />
        <div>
          <p className="profiledetails">
            UserName :<span>{username}</span>
          </p>
          <p className="profiledetails">
            Email :<span>{email}</span>
          </p>
          {/* <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <ColorButton variant="contained">Change Password</ColorButton>
            <ColorButton variant="contained">Edit Profile</ColorButton>
          </Box> */}
        </div>
        <Divider variant="middle" sx={{ bgcolor: "divider", marginTop: 42 }} />
      </div>
    </>
  );
};

export default Profile;
