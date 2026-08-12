import axios from "axios";
import { BOOKING_URLs } from "../http.services";

export default {
  searchBookings: async function (url) {
    const { data } = await axios.get(`${BOOKING_URLs.searchBookings}/${url}`, {
      withCredentials: true,
    });
    return data;
  },
  getRaisedInvoiceBookings: async function (url) {
    const { data } = await axios.get(
      `${BOOKING_URLs.getRaisedInvoiceBookings}/${url}`,
      {
        withCredentials: true,
      },
    );
    return data;
  },
  searchBookingInfo: async function (id) {
    const { data } = await axios.get(
      `${BOOKING_URLs.searchBookingInfo}/${id}`,
      {
        withCredentials: true,
      },
    );
    return data;
  },
  createBooking: async function (body) {
    const { data } = await axios.post(`${BOOKING_URLs.createBooking}`, body, {
      withCredentials: true,
    });
    return data;
  },
  updateBooking: async function (body, id) {
    const { data } = await axios.put(
      `${BOOKING_URLs.updateBooking}/${id}`,
      body,
      {
        withCredentials: true,
      },
    );
    return data;
  },
  updateService: async function (body, id) {
    const { data } = await axios.put(
      `${BOOKING_URLs.updateService}/${id}`,
      body,
      {
        withCredentials: true,
      },
    );
    return data;
  },
  addService: async function (body, id) {
    const { data } = await axios.post(
      `${BOOKING_URLs.addService}/${id}/service`,
      body,
      {
        withCredentials: true,
      },
    );
    return data;
  },
  updateCompany: async function (body, bookingID, companyID) {
    const { data } = await axios.put(
      `${BOOKING_URLs.updateCompany}/${bookingID}/company/${companyID}`,
      body,
      {
        withCredentials: true,
      },
    );
    return data;
  },
  updateClient: async function (body, id) {
    const { data } = await axios.put(
      `${BOOKING_URLs.updateClient}/${id}`,
      body,
      {
        withCredentials: true,
      },
    );
    return data;
  },
  addClient: async function (body, id) {
    const { data } = await axios.post(
      `${BOOKING_URLs.addClient}/${id}/client`,
      body,
      {
        withCredentials: true,
      },
    );
    return data;
  },
};
