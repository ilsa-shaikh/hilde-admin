import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Menu.css";
import { useNavigate } from "react-router-dom";

const Menu = ({ showmenu }) => {
  const navigate = useNavigate();
  const toprofile = () => {
    navigate("/Profile");
    showmenu(false);
  };
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      <div className="menumodal_content">
        <div className="menu_drop"></div>

        <div className="menu_detail" onClick={toprofile}>
          <PermIdentityIcon />
          Profile
        </div>
        <div className="menu_detail" onClick={logout}>
          <LogoutIcon />
          Logout
        </div>
      </div>
    </>
  );
};
export default Menu;
