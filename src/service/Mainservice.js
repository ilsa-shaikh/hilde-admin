import axios from "axios";

const getToken = () => {
  return localStorage.getItem("ntk");
};

const headers = () => {
  const token = getToken();

  return {
    headers: {
      Authentication: token,
    },
  };
};

const profile = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}UpdateOrGetProfile`,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const editprofile = async (data, image) => {
  try {
    const params = new FormData();
    params.append("username", data.name);
    console.log(image);
    {
      image && params.append("profile_pic", image);
    }

    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}UpdateOrGetProfile`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const changepassword = async (values) => {
  try {
    const params = new FormData();
    params.append("old_password", values.oldpassword);
    params.append("new_password", values.password);

    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}ChangePassword`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const dashboard = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}DashBoard`,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const userlist = async (page, searchvalue) => {
  console.log(page, searchvalue);
  try {
    const params = {
      page: page,
      search_text: searchvalue,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}UserList`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const userdetails = async (value) => {
  try {
    const params = {
      id: value,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}UserDetails`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const userdetailsmasterdata = async (params) => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}UserMasterData`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const blockunblock = async (value, status, setblock) => {
  try {
    const params = {
      id: value,
      status: status,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}UserBlockUnblock`,
      params,
      headers()
    );
    console.log(response);
    setblock(response.data.data.is_block);
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const reportlist = async (page) => {
  try {
    const params = {
      page: page,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}ReportList`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const reportdetails = async (value) => {
  try {
    const params = {
      id: value,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}ReportDetails`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const contactlist = async (page) => {
  try {
    const params = {
      page: page,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}ContactUsList`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const contactdetails = async (value) => {
  try {
    const params = {
      id: value,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}ContactDetails`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const sendreply = async (id, email, msg) => {
  try {
    const params = {
      id: id,
      user_email: email,
      reply_msg: msg,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}ReplyContactUs`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const SendPushNftTo = async (value, usertoken) => {
  try {
    const params = {
      title: value.title,
      message: value.message,
      device_token: usertoken,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}SendPushNftTo`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const SendPushNftToALl = async (value) => {
  try {
    const params = {
      title: value.title,
      message: value.msg,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}SendPushNftToALl`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

const interest = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}InterestList`,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteinterest = async (value) => {
  try {
    const params = {
      id: value,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}DelInterest`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
const addinterest = async (name, img) => {
  try {
    const params = new FormData();
    params.append("image", img);
    params.append("eng_name", name);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}AddInterest`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
const editinterest = async (name, img, id) => {
  try {
    const params = new FormData();
    {
      img && params.append("image", img);
    }
    params.append("eng_name", name);
    params.append("id", id);

    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}UpdateInterest`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
const language = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL}LanguageList`,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const languagestatus = async (value, status) => {
  try {
    const params = {
      id: value,
      status: status ? "2" : "1",
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}ChangeLangStatus`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

const addlanguage = async (name, img) => {
  try {
    const params = new FormData();
    params.append("image", img);
    params.append("name", name);
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}AddLanguage`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};
const editlanguage = async (name, img, id) => {
  try {
    const params = new FormData();
    {
      img && params.append("image", img);
    }
    params.append("name", name);
    params.append("id", id);

    const response = await axios.put(
      `${process.env.REACT_APP_BASE_URL}UpdateLanguage`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response.data;
  }
};

const getdoc = async (value) => {
  try {
    const params = {
      id: value,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}LegalDocsData`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const getterms = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL_LEGAL}TermsAndCondition`,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};
const getprivacy = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BASE_URL_LEGAL}PrivacyPolicy`,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

const updatedoc = async (value, data) => {
  try {
    const params = {
      id: value,
      english_content: data,
    };
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}UpdateLegalDocsData`,
      params,
      headers()
    );
    return response;
  } catch (error) {
    throw error.response.data;
  }
};

export default profile;
export {
  editprofile,
  changepassword,
  dashboard,
  getterms,
  getprivacy,
  userlist,
  userdetails,
  userdetailsmasterdata,
  reportlist,
  reportdetails,
  contactlist,
  contactdetails,
  sendreply,
  SendPushNftTo,
  SendPushNftToALl,
  interest,
  deleteinterest,
  addinterest,
  editinterest,
  language,
  addlanguage,
  languagestatus,
  editlanguage,
  blockunblock,
  getdoc,
  updatedoc,
};
