import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "./Sidebar";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const Layout = () => {
  const BoxStyle = styled(Box)({
    minHeight: "92vh",
    backgroundColor: "var(--bg)",
  });

  return (
    <div>
      <ResponsiveDrawer />
      <BoxStyle
        sx={{
          width: { xs: "100%", md: `calc(100% - 240px)` },
          margin: { md: "0px 0px 0px 240px" },
          paddingTop: "105px",
        }}
      >
        <Outlet />
      </BoxStyle>
    </div>
  );
};

export default Layout;
