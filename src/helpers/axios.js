import axios from "axios";

export default axios.create({
  // baseURL: "http://54.86.186.28:4444/api/v1",
  // baseURL: "http://localhost:4444/api/v1",
  baseURL: "http://192.168.43.149:4444/api/v1", // local ip
  // baseURL: "https://zwallet-team.herokuapp.com/api/v1", // deploy heroku
  // baseURL: "http://184.73.147.181:4444/api/v1", // deploy aws
});
