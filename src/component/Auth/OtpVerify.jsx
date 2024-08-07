import React from "react";
import { Alert, Snackbar } from "@mui/material";
import OTPInput, { ResendOTP } from "otp-input-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom/dist";
import { otpverify } from "../../service/Authservice";

const OTPverify = () => {
  const navigate = useNavigate();
  const [otp, setotp] = useState(Number);
  const [open, setOpen] = useState(false);
  const [error, seterror] = useState(false);
  const [loading, setloading] = React.useState(false);
  const [otperror, setotperror] = useState(false);
  const location = useLocation();
  const token = location.state.token;

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleverify = async () => {
    if (otp.length === 0) {
      setotperror("Required");
    } else if (otp.length !== 6) {
      setotperror("OTP must be 6 Characters");
    } else {
      setotperror("");
      setloading(true);
      try {
        const data = await otpverify(otp, token);
        navigate("/ResetPassword", {
          state: {
            token: data.data.token,
          },
        });
        setloading(false);
      } catch (error) {
        seterror(error.message);
        setOpen(true);
        setloading(false);
      }
    }
  };
  console.log(otp);
  return (
    <>
      <div className="App">
        <div className="Auth-form-container1">
          <div className="Auth-form1">
            <div className="Auth-form-content1">
              <h3 className="Auth-form-title">Verify OTP</h3>

              <OTPInput
                value={otp}
                onChange={(e) => {
                  setotp(e);
                  setotperror("");
                }}
                className="otp_field"
                OTPLength={6}
                otpType="number"
                disabled={false}
                inputStyles={{
                  borderRadius: 10,
                  outline: 0,
                  border: "0.5px solid #e9e6e6",
                  padding: "10px 8px",
                  marginRight: 10,
                  boxShadow: "0px 0px 30px 0px #00000012",
                  fontSize: "18px",
                }}
                resendOTP={{}}
                //  secure
              />

              {/* <ResendOTP
                renderTime={() => React.Fragment}
                renderButton={(buttonProps) => {
                  return (
                    <Button
                      {...buttonProps}
                      style={{ margin: "auto", color: "#7A7AB1" }}
                    >
                      {buttonProps.remainingTime !== 0
                        ? `Please wait for ${buttonProps.remainingTime} sec`
                        : "Resend"}
                    </Button>
                  );
                }}
              /> */}
              <button
                type="submit"
                className="Auth_button"
                disabled={loading}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                onClick={handleverify}
              >
                {loading ? "Loading...." : "Submit"}
              </button>
            </div>
          </div>
        </div>
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
export default OTPverify;
