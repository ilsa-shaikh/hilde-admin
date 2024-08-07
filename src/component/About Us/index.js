import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { getdoc, updatedoc } from "../../service/Mainservice";
import { Alert, Snackbar } from "@mui/material";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./About.css";
import { useNavigate } from "react-router-dom";

const About = () => {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [error, seterror] = useState();
  const [success, setsuccess] = useState();
  const [data, setData] = useState();
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("ntk");

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
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await getdoc(3);
      setloading(false);
      console.log(response.data);
      setData(response.data.data.english_content);
    } catch (error) {
      setloading(false);
      if (error.code === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const handlesave = async () => {
    try {
      const response = await updatedoc("3", data);
      setloading(false);
      setsuccess(response.data.message);
      setOpen2(true);
    } catch (error) {
      setloading(false);
      seterror(error.message);
      setOpen(true);
      if (error.code === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };
  return (
    <>
      {/* <div className="languageoptions">
        <li className={lng === "english_content" ? "active_profile" : ""}>
          <Link to="/AboutUs?lng=english_content">English</Link>
        </li>
        <li className={lng === "francias_content" ? "active_profile" : ""}>
          <Link to="/AboutUs?lng=francias_content">French</Link>
        </li>
        <li className={lng === "deutsch_content" ? "active_profile" : ""}>
          <Link to="/AboutUs?lng=deutsch_content">Dutch</Link>
        </li>
        <li className={lng === "italiano_content" ? "active_profile" : ""}>
          <Link to="/AboutUs?lng=italiano_content">Italian</Link>
        </li>
      </div> */}

      <div className="doccontainer1">
        <div id="editor"></div>

        <h1 className="data_heading">About Us</h1>

        <CKEditor
          editor={DecoupledEditor}
          data={data}
          config={{
            ckfinder: {
              uploadUrl: `${process.env.REACT_APP_BASE_URL}/ImgLegalDocsData?Authentication=${token}`,
            },
          }}
          onChange={(event, editor) => {
            const newdata = editor.getData();
            setData(newdata);
          }}
          onReady={(editor) => {
            const editableElement = editor.ui.getEditableElement();

            if (editableElement && editableElement.parentElement) {
              editableElement.parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editableElement
              );
            }
          }}
          onError={(error, { willEditorRestart }) => {
            if (willEditorRestart) {
              this.editor.ui.view.toolbar.element.remove();
            }
          }}
        />
        <div
          className="view_button"
          onClick={() =>
            navigate("/View", {
              state: {
                id: "3",
              },
            })
          }
        >
          <VisibilityIcon />
          View Content
        </div>
        <button className="ckedit_button" onClick={handlesave}>
          Save
        </button>
        {loading && <Loader />}
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

export default About;
