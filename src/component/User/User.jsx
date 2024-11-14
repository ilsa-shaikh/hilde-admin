import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";
import Pagination from "../Pagination/pagination";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../Loader/Loader";
import { userlist } from "../../service/Mainservice";

const UserList = () => {
  const [loading, setloading] = useState(true);
  // const [data, setData] = useState([]);
  const [searchvalue, setsearchvalue] = useState();
  const [pagination, setpagination] = useState({ page: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    getData(pagination.page);
  }, []);

  useEffect(() => {
    getData(1);
  }, [searchvalue]);

  const getData = async (page) => {
    try {
      const response = await userlist(page, searchvalue);
      console.log(response.data);
      // setData(response.data.data);
      setpagination(response.data.pagination);
      setloading(false);
    } catch (error) {
      setloading(false);
      if (error.code === 401) {
        localStorage.clear();
        navigate("/");
      }
    }
  };

  const data = [
    {
      uuid: "INss3xIqEyZkLg1gfhdrgycSLej2",
      first_name: "Naved",
      last_name: "Shaikh",
      email: "example@gmail.com",
      phone_number: "988324235",
      date_created: "2024-07-24",
    },
    {
      uuid: "84f0ce3ac2008dfa9aee7f87c7da37",
      first_name: "Naved",
      last_name: "Shaikh",
      email: "example@gmail.com1",
      phone_number: "1234567890",
      date_created: "2024-07-26",
    },
  ];
  return (
    <>
      <div className="container1">
        <div className="data_head">
          <h1 className="data_heading">All User List</h1>

          <div className="searchicon">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search..."
              id="search"
              onChange={(e) => setsearchvalue(e.target.value)}
              autoComplete="off"
            />
          </div>
        </div>
        <div className="data_table_over">
          <table className="data_table">
            <thead>
              <tr>
                <th>Id</th>
                <th>User</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Create At</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr
                  key={item.id}
                  onClick={() =>
                    navigate("/User_Details", {
                      state: {
                        id: item.id,
                      },
                    })
                  }
                >
                  <td>{item.uuid}</td>

                  <td>
                    {/* <img
                      src={
                        
                        item.profile_img
                      }
                      alt="profile"
                      className="data_userdetails_img"
                    /> */}
                    {item.first_name + " " + item.last_name}
                  </td>
                  <td>{item.phone_number}</td>
                  <td>{item.email}</td>
                  <td>{item.date_created}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination pagedata={pagination} onPageChange={getData} />
      </div>
      {loading && <Loader />}
    </>
  );
};
export default UserList;
