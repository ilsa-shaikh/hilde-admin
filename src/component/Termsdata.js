import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { getterms } from "../service/Mainservice";
import { useState } from "react";
import renderHTML from "react-render-html";

const Termdata = () => {
  const [loading, setloading] = useState(true);
  const [view, setview] = useState(true);

  useEffect(() => {
    getdata();
  }, []);

  const getdata = async () => {
    try {
      const response = await getterms();
      const data = renderHTML(response.data.data);
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
export default Termdata;
