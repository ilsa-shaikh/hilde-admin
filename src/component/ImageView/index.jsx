import React from "react";
import { Modal } from "@mui/material";
import "./index.css";
import CloseIcon from "@mui/icons-material/Close";

const Imageview = ({ showimage, setshowimage, url }) => {
  return (
    <Modal
      open={showimage}
      onClose={() => setshowimage(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <img src={url} alt="fullimage" className="imagefullview" />
        <CloseIcon className="closeicon" onClick={() => setshowimage(false)} />
      </div>
    </Modal>
  );
};
export default Imageview;
