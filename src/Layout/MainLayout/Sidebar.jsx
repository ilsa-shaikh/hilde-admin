import * as React from "react";
import { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import PostAddIcon from "@mui/icons-material/PostAdd";
import CallIcon from "@mui/icons-material/Call";
import IconButton from "@mui/material/IconButton";
import ArticleIcon from "@mui/icons-material/Article";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import InfoIcon from "@mui/icons-material/Info";
import InterestsIcon from "@mui/icons-material/Interests";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import TranslateIcon from "@mui/icons-material/Translate";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import { People } from "@mui/icons-material";

// import profile from "../../service/Mainservice";
import "./Sidebar.css";
import NotificationModal from "./Notification";
import Menu from "./Menu";
import { useEffect } from "react";
import profile_pic from "../../assets/agent (2).png";
import logo from "../../assets/logo.png";

const drawerWidth = 250;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shownotification, setshownotification] = useState(false);
  const [showmenu, setshowmenu] = useState(false);

  const location = useLocation();
  const sidebarRef = useRef(null);
  const menuref = useRef();
  // const profile = JSON.parse(localStorage.getItem("Data"))?.profile_pic;

  useEffect(() => {
    localStorage.getItem("isuser");
    let handler = (event) => {
      console.log(menuref.current.contains(event.target));
      if (!menuref.current.contains(event.target)) {
        setshownotification(false);
        setshowmenu(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const CheckPath = (path) => location.pathname === path;
  const drawer = (
    <div className="Sidebar">
      <div className="Sidebar_logodiv">
        <img src={logo} className="sidebar_logo" />
      </div>
      <ul className="sidebar_alllist">
        <li
          className={
            CheckPath("/Dashboard") ? "Selectedsidebar" : "SidebarItem"
          }
          onClick={() => setMobileOpen(false)}
        >
          <Link to="/Dashboard">
            <DashboardIcon />
            <p className="sidebarlabel">Dashboard</p>
          </Link>
        </li>
        {/* <li
        className={CheckPath("/Admin_List") ? "Selectedsidebar" : "SidebarItem"}
        onClick={() => setMobileOpen(false)}
      >
        <Link to="/Admin_List">
          <PersonIcon />
          <p className="sidebarlabel">Travel</p>
        </Link>
      </li> */}
        <li
          className={
            CheckPath("/User_List") ? "Selectedsidebar" : "SidebarItem"
          }
          onClick={() => setMobileOpen(false)}
        >
          <Link to="/User_List">
            <People />
            <p className="sidebarlabel">User</p>
          </Link>
        </li>
        {(CheckPath("/User_Details") ||
          CheckPath("/User_Details_Favorite") ||
          CheckPath("/User_Details_Matches") ||
          CheckPath("/User_Details_Likes")) && (
          <li
            className={
              CheckPath("/User_Details") ||
              CheckPath("/User_Details_Favorite") ||
              CheckPath("/User_Details_Matches") ||
              CheckPath("/User_Details_Likes")
                ? "Selectedsidebar"
                : "SidebarItem"
            }
            onClick={() => setMobileOpen(false)}
          >
            <div>
              <ArticleIcon />

              <p className="sidebarlabel">User Details</p>
            </div>
          </li>
        )}
        {/* <li
          className={
            CheckPath("/ContactUs_List") ? "Selectedsidebar" : "SidebarItem"
          }
          onClick={() => setMobileOpen(false)}
        >
          <Link to="/ContactUs_List">
            <CallIcon />
            <p className="sidebarlabel">Contact Us</p>
          </Link>
        </li>

        {CheckPath("/ContactUs_Details") && (
          <li
            className={
              CheckPath("/ContactUs_Details")
                ? "Selectedsidebar"
                : "SidebarItem"
            }
            onClick={() => setMobileOpen(false)}
          >
            <div>
              <ArticleIcon />

              <p className="sidebarlabel">ContactUs details</p>
            </div>
          </li>
        )} */}
        <li
          className={
            CheckPath("/Push_Notification") ? "Selectedsidebar" : "SidebarItem"
          }
          onClick={() => setMobileOpen(false)}
        >
          <Link to="/Push_Notification">
            <NotificationsNoneIcon />
            <p className="sidebarlabel">Push Notification</p>
          </Link>
        </li>
        <li
          className={CheckPath("/About_Us") ? "Selectedsidebar" : "SidebarItem"}
          onClick={() => setMobileOpen(false)}
        >
          <Link to="/About_Us">
            <InfoIcon />
            <p className="sidebarlabel">About Us</p>
          </Link>
        </li>
        <li
          className={
            CheckPath("/TermsofService") ? "Selectedsidebar" : "SidebarItem"
          }
          onClick={() => setMobileOpen(false)}
        >
          <Link to="/TermsofService">
            <PostAddIcon />
            <p className="sidebarlabel">Terms of Service</p>
          </Link>
        </li>
        <li
          className={
            CheckPath("/Privacy_Policy") ? "Selectedsidebar" : "SidebarItem"
          }
          onClick={() => setMobileOpen(false)}
        >
          <Link to="/Privacy_Policy">
            <PrivacyTipIcon />
            <p className="sidebarlabel">Privacy Policy</p>
          </Link>
        </li>
      </ul>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <div ref={sidebarRef}>
      <div>
        <div className="appbar">
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: "none" },
              color: "black",
            }}
          >
            <MenuIcon />
          </IconButton>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            {/* <Badge
              badgeContent={4}
              color="error"
              sx={{ cursor: "pointer" }}
              onClick={() => setshownotification(true)}
            >
              <NotificationsNoneIcon color="action" />
            </Badge> */}
            <img
              alt="profileimg"
              src={profile_pic}
              className="appbarprofileimg"
              onClick={() => setshowmenu(true)}
            />
          </div>
        </div>
        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
            backgroundColor: "#fff",
            zIndex: 0,
          }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                borderRight: "1px solid var(--red2)",
                // backgroundColor: "var(--bg)",
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },

              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                border: "none",
                borderRight: "1px solid var(--bg2)",
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </div>
      <div ref={menuref}>
        {shownotification && <NotificationModal />}
        {showmenu && <Menu showmenu={setshowmenu} />}
      </div>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
