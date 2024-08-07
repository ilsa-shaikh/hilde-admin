import { useEffect } from "react";
import Loader from "../../Loader/Loader";
import { useLocation } from "react-router-dom";
import { getdoc } from "../../service/Mainservice";
import { useState } from "react";
import renderHTML from "react-render-html";

const View = () => {
  const [loading, setloading] = useState(true);
  const [view, setview] = useState(true);

  const location = useLocation();
  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await getdoc(location.state.id);
      const data = renderHTML(response.data.data.english_content);
      setview(data);
      setloading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="Viewdata">
        {view}
        {loading && <Loader />}
      </div>
    </>
  );
};
export default View;
