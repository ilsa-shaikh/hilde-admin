import React, { useEffect, useState } from "react";
import "./Dashboard.css";
// import ReactApexChart from "react-apexcharts";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import GroupIcon from "@mui/icons-material/Group";
import { dashboard } from "../../service/Mainservice";
import Loader from "../../Loader/Loader";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setloading] = useState(true);
  const [details, setdetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const data = await dashboard();
      console.log(data);
      setloading(false);
      setdetails(data.data.data);
    } catch (error) {
      setloading(false);
      if (error.code === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  // const option = {
  //   labels: ["Private Account", "Public Account"],
  //   fill: {
  //     // type: "gradient",
  //   },
  //   title: {
  //     text: "Private and Public Account",
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 1150,
  //       options: {
  //         legend: {
  //           position: "bottom",
  //         },
  //       },
  //     },
  //     {
  //       breakpoint: 1050,
  //       options: {
  //         chart: {
  //           width: 300,
  //         },
  //       },
  //     },
  //     {
  //       breakpoint: 900,
  //       options: {
  //         chart: {
  //           width: 400,
  //         },
  //         legend: {
  //           position: "right",
  //         },
  //       },
  //     },
  //     {
  //       breakpoint: 450,
  //       options: {
  //         chart: {
  //           width: 350,
  //         },
  //         legend: {
  //           position: "bottom",
  //         },
  //       },
  //     },
  //   ],
  // };
  // const series = [12, 12];
  //New users integration

  return (
    <>
      <div className="card_list">
        {/* <div className="card">
          <div className="card_icon">
            <PersonOutlineIcon sx={{ fontSize: "30px", color: "var(--red)" }} />
          </div>
          <div className="card_data">
            <h1>121</h1>

            <p>New Users</p>
          </div>
        </div> */}
        <div className="card">
          <div className="card_icon">
            <GroupIcon sx={{ fontSize: "30px", color: "var(--white)" }} />
          </div>
          <div className="card_data">
            <h1>{details.total_users}1223</h1>

            <p>Total Users</p>
          </div>
          <div className="go-corner" />
        </div>
        <div className="card">
          <div className="card_icon">
            <PersonOutlineIcon
              sx={{ fontSize: "30px", color: "var(--white)" }}
            />
          </div>
          <div className="card_data">
            <h1>423{details.active_users}</h1>
            <p>Active Users</p>
          </div>
          <div className="go-corner" />
        </div>
      </div>
      {/* <div id="chart">
        <ReactApexChart
          options={option}
          series={series}
          type="donut"
          width={380}
        />
      </div> */}
      {loading && <Loader />}
    </>
  );
};
export default Dashboard;
