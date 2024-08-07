import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./User.css";
import Pagination from "../Pagination/pagination";
import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../Loader/Loader";
import { userlist } from "../../service/Mainservice";

const UserList = () => {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
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
      setData(response.data.data);
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
                <th>User</th>
                <th>Mobile Number</th>
                <th>Email</th>
                <th>Subsciption</th>
                <th>Status</th>
                {/* <th>Action</th> */}
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
                  <td>
                    {/* <img
                      src={
                        
                        item.profile_img
                      }
                      alt="profile"
                      className="data_userdetails_img"
                    /> */}
                    {item.full_name}
                  </td>
                  <td>{item.country_code + item.phone_number}</td>
                  <td>{item.email}</td>
                  <td>
                    {item.is_block ? (
                      <span className="cancel_data">Yes</span>
                    ) : (
                      <span className="complete_data">No</span>
                    )}
                  </td>
                  <td>
                    {item.is_block ? (
                      <span className="cancel_data">Deactive</span>
                    ) : (
                      <span className="complete_data">Active</span>
                    )}
                  </td>
                  {/* <td>
                    <button
                      onClick={() => navigate("/User_Details")}
                      className="data_button_view"
                    >
                      View
                    </button>
                  </td> */}
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
