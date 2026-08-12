import axios from "axios";
import { USER_URLs } from "../http.services";

export default {
  login: async function (body) {
    const { data } = await axios.post(`${USER_URLs.login}`, body, {
      withCredentials: true,
    });
    return data;
  },
  loadUser: async function () {
    const { data } = await axios.get(`${USER_URLs.loadUser}`, {
      withCredentials: true,
    });
    return data;
  },
  logout: async function () {
    const { data } = await axios.get(`${USER_URLs.logout}`, {
      withCredentials: true,
    });
    return data;
  },
};
