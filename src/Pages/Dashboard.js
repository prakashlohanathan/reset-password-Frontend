import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Uncomment and modify the following lines based on your API call logic
    try {
      const res = await axios.post("http://localhost:5000/users/user", {
        headers: {
          "x-access-token": "token-value",
        },
      });

      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };
      console.log(result);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div className="m-5 p-5">
      <button className="btn btn-success m-5" onClick={handleSubmit}>
        Get User Data
      </button>
      <h4 className="text-center">
        Welcome <b className="h1"> {localStorage.getItem("loginUserName")}</b>
      </h4>
      <h4 className="text-center">
        Email Id: <b className="h1 "> {localStorage.getItem("EmailId")}</b>
      </h4>
      <button className="btn btn-danger m-5" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
};

export default User;
