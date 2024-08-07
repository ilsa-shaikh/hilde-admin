import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("ntk");
    console.log(userToken);
    if (!userToken || userToken === "") {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      setIsLoggedIn(true);
    }
  }, []);

  return isLoggedIn ? <>{props.children}</> : null;
};

export default ProtectedRoute;
