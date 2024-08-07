import React from "react";
import { makeStyles, styled } from "@material-ui/core";
import { Avatar, Divider, Button, Typography } from "@mui/material";

import { Box } from "@mui/system";

const useStyles = makeStyles({
  root: {
    width: "85%",
    height: "70vh",
    backgroundColor: "#ffff",
    margin: "20px auto",
  },
  updiv: {
    background: "linear-gradient(273.61deg, #851417 -55.94%, #FB4B50 140.59%)",
    height: "27vh",
  },
  image: {
    display: "block",
    margin: "-60px auto",
    marginBottom: "30px !important",
    width: "110px",
    height: "110px",
    border: "3px solid transparent",
    outline: "2px solid white",
  },
  details: {
    margin: "15px 30px",
    paddingBottom: "15px",
    fontWeight: "bold",
    fontSize: 15,
    fontFamily: "Poppins",
    borderBottom: "1px solid #e1e1e1",
    display: "flex",
    gap: "5px",
  },
  name: {
    fontWeight: "normal",
  },
});
const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "var(--red)",
  margin: "20px",
  marginTop: "50px",
  "&:hover": {
    backgroundColor: "transparent",
    border: "1px solid var(--red)",
    color: "var(--red)",
    boxShadow: "None",
  },
}));

const Profile = () => {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.updiv} />
        <Avatar
          className={classes.image}
          alt="Two way"
          src="/static/my-photo/profile.png"
        />
        <Box>
          <Typography className={classes.details}>
            UserName :
            <Typography
              variant="span"
              component="span"
              className={classes.name}
            >
              James Ronald
            </Typography>
          </Typography>
          <Typography className={classes.details}>
            Email :
            <Typography
              variant="span"
              component="span"
              className={classes.name}
            >
              JamesR43@gmail.com
            </Typography>
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
            <ColorButton variant="contained">Change Password</ColorButton>
            <ColorButton variant="contained">Edit Profile</ColorButton>
          </Box>
        </Box>
        <Divider variant="middle" sx={{ bgcolor: "divider", marginTop: 42 }} />
      </Box>
    </>
  );
};

export default Profile;
