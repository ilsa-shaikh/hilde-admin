import axios from "axios";

const login = async (data) => {
  const params = new FormData();
  params.append("email", data.email);
  params.append("password", data.password);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}login`,
      params
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const forgetpassword = async (data) => {
  const params = new FormData();
  params.append("email", data.email);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}ForgotOtpApi`,
      params
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const otpverify = async (data, token) => {
  const otpno = Number(data);
  const params = {
    otp: otpno,
  };

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}Otpverification`,
      params,
      {
        headers: {
          Authentication: token,
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const resetpassword = async (data, token) => {
  const params = new FormData();
  params.append("new_password", data);

  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}Newpassword`,
      params,
      {
        headers: {
          Authentication: token,
        },
      }
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export default login;
export { forgetpassword, otpverify, resetpassword };
