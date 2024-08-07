import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import logo from "../../assets/logo.png";
import "./login.css";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@mui/material";
import login from "../../service/Authservice";
import Particles from "@tsparticles/react";

function Signin() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const [init, setInit] = useState(false);

  // useEffect(() => {
  //   data();
  // }, []);

  // const data = async () => {
  //   try {
  //     const plaintext = "admin@gmail.com";
  //     const enemail = encryptString(plaintext);

  //     // ----------------------------------------------------
  //     const params = {
  //       email: enemail,
  //     };
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_BASE_URL}DemoHmac`,
  //       params,
  //       {
  //         headers: {
  //           "Access-key": generateKey(),
  //         },
  //       }
  //     );
  //     const encrypted_string = response.data.data;

  //     const deemail = decryptString(encrypted_string);
  //     console.log(deemail);
  //   } catch (error) {
  //     throw error;
  //   }
  // };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleLogin = async (values) => {
    setloading(true);
    try {
      // const data = await login(values);
      // console.log(data);
      // localStorage.setItem("Data", JSON.stringify(data.data.data));
      // localStorage.setItem("ntk", data.data.token);
      setloading(false);
      navigate("/Dashboard");
    } catch (error) {
      setError(error.message);
      setOpen(true);
      setloading(false);
    }
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Required";
    } else if (values.password.length < 4) {
      errors.password = "Must be at least 4 characters";
    } else if (values.password.length > 20) {
      errors.password = "Must be 20 characters or less";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "admin@gmail.com",
      password: "1234",
    },
    validate,
    onSubmit: (values) => {
      handleLogin(values);
    },
  });

  const particlesLoaded = (container) => {
    console.log(container);
  };

  return (
    <div className="App">
      <div className="Auth-form-container1">
        <div className="Auth-form1">
          <div className="Auth-logo">
            <img src={logo} className="logo_img" />
          </div>
          <div className="Auth-form-content1">
            <h3 className="Auth-form-title">Log In</h3>
            <form onSubmit={formik.handleSubmit} className="Auth_formdata">
              <div className="form-group mt-3">
                <label className="Auth_label">Email address</label>
                <input
                  type="email"
                  className="Auth_input"
                  placeholder="Enter email"
                  name="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email ? (
                  <p className="invalid">{formik.errors.email} </p>
                ) : null}

                {/* <Form.Control.Feedback  className="invalid">
                  {emailError}
                </Form.Control.Feedback> */}
              </div>
              <br />
              <div className="form-group mt-3">
                <label className="Auth_label">Password</label>
                <input
                  type="text"
                  name="password"
                  className="Auth_input"
                  placeholder="Enter password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                {formik.errors.password ? (
                  <p className="invalid">{formik.errors.password} </p>
                ) : null}

                {/* <Form.Control.Feedback  className="invalid">
                  {PasswordError}
                </Form.Control.Feedback> */}
              </div>

              <br />
              <p
                className="forgot-password text-right mt-2"
                onClick={() => navigate("/ForgetPassword")}
              >
                Forgot password?
              </p>

              <div style={{ display: "flex", justifyContent: "left" }}></div>
              <button
                type="submit"
                className="Auth_button"
                disabled={loading}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                {loading ? "Loading...." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="particles-container">
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "#0d47a1",
              },
            },
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 6,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 5 },
              },
            },
            detectRetina: true,
          }}
        />{" "}
      </div>

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Signin;
