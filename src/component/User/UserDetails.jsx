import { useState } from "react";
import { useEffect } from "react";

import "./UserDetails.css";
import Loader from "../../Loader/Loader";
import { useLocation, useNavigate } from "react-router-dom";
import {
  blockunblock,
  userdetails,
  userdetailsmasterdata,
} from "../../service/Mainservice";
import PushNotification from "../Notification/PushNotification";

const UserDetails = () => {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState({});
  const [mdata, setmData] = useState({});
  const [block, setblock] = useState();
  const Navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;

  useEffect(() => {
    if (id) {
      getData(id);
    }
  }, []);

  const getData = async (id) => {
    try {
      const response = await userdetails(id);
      console.log(response.data.data);
      setData(response.data.data);
      setblock(response.data.data.is_block);
      setloading(false);
      getMData(response.data.data);
    } catch (error) {
      setloading(false);
      if (error.code === 401) {
        localStorage.clear();
        Navigate("/");
      }
    }
  };
  const getMData = async (val) => {
    try {
      const params = {
        your_language: val.your_lang,
        to_learn_language: val.to_learn_lang,
        interest_ids: val.interests_ids,
      };

      const response = await userdetailsmasterdata(params);
      console.log(response.data.data);
      setmData(response.data.data);
      setloading(false);
    } catch (error) {
      setloading(false);
      if (error.code === 401) {
        localStorage.clear();
        Navigate("/");
      }
    }
  };
  return (
    <>
      <h1 className="userdetails_heading">User Details </h1>
      <div className="userdetails">
        <div className="userdetails_up">
          <div className="userprofile_up">
            <div className="userprofile_up_imglist">
              {data.profile_pic?.map((item) => (
                <img src={item} alt="img" />
              ))}
              {/* <img src={img2} alt="img" />
              <img src={img3} alt="img" />
              <img src={img4} alt="img" />
              <img src={img5} alt="img" />
              <img src={img6} alt="img" /> */}
            </div>

            <h1 className="username">
              {data.full_name},{data.age}
            </h1>
            <p className="userbio">{data.about_self} </p>
          </div>
          <div className="userprofile_down">
            {data.device_token ? (
              <PushNotification id={data.device_token} />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="userdetails_down">
          <p className="userdata">
            Phone Mumber: <span>{data.country_code + data.phone_number}</span>
          </p>
          <p className="userdata">
            Country: <span>{data.country}</span>
          </p>
          <p className="userdata">
            Email: <span>{data.email}</span>
          </p>
          <p className="userdata">
            Account Create: <span>{data.date_created}</span>
          </p>
          <p className="userdata">
            Date of Birth: <span>{data.birth_date}</span>
          </p>
          <p className="userdata">
            Age Range:{" "}
            <span>
              {data.start_age}-{data.end_age}
            </span>
          </p>

          <p className="userdata">
            Gender: <span>{data.gender === 1 ? "Male" : "Female"}</span>
          </p>
          {/* <p className="userdata">
            Interested Gender: <span>Male</span>
          </p> */}
          <p className="userdata">
            App Language: <span>{data.language}</span>
          </p>
          <p className="userdata">
            Why here:{" "}
            <span>{data.why_here === "1" ? "To Date" : "Make friends"}</span>
          </p>
          <div className="userdata">
            User Langugae: <br />
            <ol className="userdata_lng">
              {mdata.your_language?.map((i) => (
                <li>
                  Speaks: <span>{i.name}</span>
                  <br />
                  Level: <span>{i.level}</span>
                </li>
              ))}
            </ol>
          </div>
          <p className="userdata">
            Learns: <span>{mdata.to_learn_language?.map((i) => `${i},`)}</span>
          </p>
          <p className="userdata">
            Interests:{" "}
            <div className="userdata_interest">
              {/* {data.from_location === null ? (
                "Not Defined Yet"
              ) : ( */}
              <>
                {mdata.interest_ids?.map((i) => (
                  <span>
                    <img src={i.image} className="interest_img" />
                    {i.name}
                  </span>
                ))}
              </>
              {/* )} */}
            </div>
          </p>
          <p className="userdata">
            Location: <span>{data.location}</span>
          </p>
          <p className="userdata">
            Max Distance: <span>{data.max_distance}</span>
          </p>

          <p className="userdata">
            Social Type: <span>{data.social_type}</span>
          </p>
          <p className="userdata">
            Device Type: <span>{data.device_type}</span>
          </p>
          <p className="userdata">
            Status: <span>{block === false ? "Unblock" : "Block"}</span>
          </p>
          <div className="userreports">
            {/* <h1>25 Reports</h1> */}
            {block ? (
              <button
                className="useractive_button"
                onClick={() => blockunblock(data.id, "2", setblock)}
              >
                Unblock
              </button>
            ) : (
              <button
                className="userdeactive_button"
                onClick={() => blockunblock(data.id, "1", setblock)}
              >
                Block
              </button>
            )}
          </div>
        </div>
      </div>
      {data.device_token ? (
        <div className="user_notification">
          <PushNotification id={data.device_token} />
        </div>
      ) : (
        ""
      )}

      {loading && <Loader />}
    </>
  );
};
export default UserDetails;
