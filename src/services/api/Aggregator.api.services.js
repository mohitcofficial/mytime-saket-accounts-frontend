import axios from "axios";
import { AGGREGATOR_URLs } from "../http.services";

export default {
  getAllAggregators: async function (url) {
    const { data } = await axios.get(`${AGGREGATOR_URLs.getAllAggregators}`, {
      withCredentials: true,
    });
    return data;
  },
  createAggregators: async function (body) {
    const { data } = await axios.post(
      `${AGGREGATOR_URLs.createAggregator}`,
      body,
      {
        withCredentials: true,
      },
    );
    return data;
  },
};
