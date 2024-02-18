import axios from "axios";

export default axios.create({
  baseURL: "https://resetpasswordbe-yrgz.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});