import "./Notificationmodal.css";
import { useNavigate } from "react-router-dom";
// import { ReactScrollPagination } from 'react-scroll-pagination';
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
// import InfiniteScroll from "react-infinite-scroll-component";
// import AppConfig from "../../Api/AppConfig";

const NotificationModal = () => {
  const [currPage, setCurrPage] = useState(0);
  const [nf, setnf] = useState([]);
  const [temp, settemp] = useState(nf);
  const [hasNext, sethasNext] = useState();
  const [totalpage, setTotalpage] = useState();

  const navigate = useNavigate();
  const userToken = localStorage.getItem("token");

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  //   const fetchData = () => {
  //     const params = new FormData();
  //     params.append("notification_read", 1);

  //     try {
  //       let config = {
  //         url: `${AppConfig.BASE_URL_v1}couple_notification_api`,
  //         method: "POST",
  //         data: params,
  //         headers: {
  //           Authentication: userToken,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       };
  //       axios(config)
  //         .then((res) => res.data)
  //         .then((response) => {
  //           const redata = response.data;
  //           setnf(redata);
  //           const next = response.pagination.has_next;
  //           sethasNext(next);
  //           const data = response.pagination.page;
  //           setCurrPage(data);
  //           const tpage = response.pagination.total_pages;
  //           setTotalpage(tpage);
  //         })
  //         .catch((error) => {
  //           if (error.response.data.code === 401) {
  //             localStorage.clear();
  //             navigate("/Login");
  //           }
  //         });
  //     } catch (error) {}
  //   };

  //   const onScroll = () => {
  //     let CurrPage = currPage + 1;
  //     const params = new FormData();
  //     params.append("page", CurrPage);

  //     try {
  //       let config = {
  //         url: `${AppConfig.BASE_URL_v1}couple_notification_api`,
  //         method: "POST",
  //         data: params,
  //         headers: {
  //           Authentication: userToken,
  //         },
  //       };
  //       axios(config)
  //         .then((res) => res.data)
  //         .then((response) => {
  //           const redata = response.data;
  //           settemp(redata);
  //           const alldata = nf.concat(redata);
  //           setnf(alldata);
  //           const next = response.pagination.has_next;
  //           sethasNext(next);
  //           const data = response.pagination.page;
  //           setCurrPage(data);
  //           const tpage = response.pagination.total_pages;
  //           setTotalpage(tpage);
  //         })
  //         .catch((error) => {
  //           const err = error.response.data.message;
  //           if (error.response.data.code === 401) {
  //             localStorage.clear();
  //             navigate("/Login");
  //           }
  //         });
  //     } catch (error) {}
  //   };
  //   const chat = (e) => {
  //     if (e.room_id) {
  //       const room = e.room_id;
  //       localStorage.setItem("room_id", room);
  //       navigate("/Chat", {
  //         state: {
  //           name: e.title,
  //           pic: e.user_img,
  //         },
  //       });
  //     } else {
  //       localStorage.setItem("job_id", e.job_id);
  //       navigate(e.screen === "job_details" ? "/Jobdetail_Bid" : "");
  //     }
  //   };
  return (
    <>
      <div className="notificationmodal_content">
        <div className="notification_drop"></div>
        <h2 className="nf_heading">Notifications</h2>
        <div>
          {/* <InfiniteScroll
            dataLength={nf.length}
            next={onScroll}
            style={{ display: "flex", flexDirection: "column" }} //To put endMessage and loader to the top.
            hasMore={hasNext}
            // inverse={true}
            height={400}
            loader={<h4>Loading...</h4>}
            scrollableTarget="notification_detail"
          > */}
          {/* {nf?.length > 0 ? (
              <>
                {nf?.map((nf, index) => ( */}
          <div className="notification_detail">
            <p className="nf_title">
              <img
                alt="user-image"
                src="/static/my-photo/profile.png"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                }}
              />
              New feedback{" "}
            </p>
            <p className="nf_msg">Here are few thing...</p>
            <p className="nf_time">5 sec ago</p>
          </div>
          <div className="notification_detail">
            <p className="nf_title">
              <img
                alt="user-image"
                src="/static/my-photo/profile.png"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                }}
              />
              New feedback{" "}
            </p>
            <p className="nf_msg">I like this app</p>
            <p className="nf_time">10 sec ago</p>
          </div>
          <div className="notification_detail">
            <p className="nf_title">
              <img
                alt="user-image"
                src="/static/my-photo/profile.png"
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                }}
              />
              New Report
            </p>
            <p className="nf_msg">1 new reeport on user</p>
            <p className="nf_time">15 sec ago</p>
          </div>
          {/* ))} */}
          {/* {temp?.map((nf, index) => ( */}
          {/* <div
            className="notification_detail"
            key={index}
            onClick={() => chat(nf)}
          >
            <p className="nf_title">
              {" "}
              <img
                alt="user-image"
                src={nf.user_img}
                style={{
                  width: "35px",
                  height: "35px",
                  borderRadius: "50%",
                }}
              />
              {nf.title}
            </p>
            <p className="nf_msg">{nf.message}</p>
            <p className="nf_time">{nf.timestamps}</p>
          </div> */}
          {/* ))} */}
          {/* </>
            ) : (
              <div className="nodata" style={{ color: "white" }}>
                No Notifications yet
              </div>
            )} */}
          {/* </InfiniteScroll> */}
        </div>
      </div>
    </>
  );
};
export default NotificationModal;
