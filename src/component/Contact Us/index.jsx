import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Pagination from "../Pagination/pagination";
// import SearchIcon from "@mui/icons-material/Search";
import Loader from "../../Loader/Loader";
import { contactlist } from "../../service/Mainservice";

const ContactList = () => {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  // const [searchvalue, setsearchvalue] = useState();
  const [pagination, setpagination] = useState({ page: 1 });
  const navigate = useNavigate();

  useEffect(() => {
    getData(pagination.page);
  }, []);

  // useEffect(() => {
  //   getData(1);
  // }, [searchvalue]);

  const getData = async (page) => {
    try {
      const response = await contactlist(page);
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
          <h1 className="data_heading">All Contact Us List</h1>

          {/* <div className="searchicon">
            <SearchIcon />
            <input
              type="search"
              placeholder="Search..."
              id="search"
              onChange={(e) => setsearchvalue(e.target.value)}
              autoComplete="off"
            />
          </div> */}
        </div>
        <div className="data_table_over">
          <table className="data_table">
            <thead>
              <tr>
                <th>Date Created</th>
                <th>title</th>
                <th>message</th>
                <th>Reply </th>
                <th>Read</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item) => (
                <tr
                  key={item.id}
                  onClick={() =>
                    navigate("/ContactUs_Details", {
                      state: {
                        id: item.id,
                      },
                    })
                  }
                >
                  <td className="data_userdetails">{item.date_created}</td>
                  <td>{item.title}</td>
                  <td>{item.message}</td>

                  <td>
                    {item.is_reply ? (
                      <span className="cancel_data">Yes</span>
                    ) : (
                      <span className="complete_data">No</span>
                    )}
                  </td>
                  <td>
                    {item.is_read ? (
                      <span className="cancel_data">Yes</span>
                    ) : (
                      <span className="complete_data">No</span>
                    )}
                  </td>
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
export default ContactList;
