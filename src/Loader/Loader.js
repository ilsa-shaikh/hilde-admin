import "./Loader.css";
import logo from "../assets/logo.png";
import { RotatingLines } from "react-loader-spinner";

const Loader = () => (
  <div className="loaderdiv">
    <RotatingLines
      visible={true}
      height="96"
      width="96"
      color="grey"
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
    <img src={logo} />
  </div>
);

export default Loader;
