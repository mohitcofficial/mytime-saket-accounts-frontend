export const BASEURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const USER_URLs = {
  login: `${BASEURL}/api/v1/user/login`,
  loadUser: `${BASEURL}/api/v1/me`,
  logout: `${BASEURL}/api/v1/logout`,
};
export const BOOKING_URLs = {
  searchBookings: `${BASEURL}/api/v1/bookings`,
  searchBookingInfo: `${BASEURL}/api/v1/booking`,
  getRaisedInvoiceBookings: `${BASEURL}/api/v1/bookings/invoice`,
  createBooking: `${BASEURL}/api/v1/booking`,
  updateBooking: `${BASEURL}/api/v1/booking`,
  updateService: `${BASEURL}/api/v1/service`,
  addService: `${BASEURL}/api/v1/booking`,
  updateCompany: `${BASEURL}/api/v1/booking`,
  updateClient: `${BASEURL}/api/v1/client`,
  addClient: `${BASEURL}/api/v1/booking`,
};

export const AGGREGATOR_URLs = {
  getAllAggregators: `${BASEURL}/api/v1/aggregator`,
  createAggregator: `${BASEURL}/api/v1/aggregator`,
  updateAggregator: `${BASEURL}/api/v1/aggregator`,
  deleteAggregator: `${BASEURL}/api/v1/aggregator`,
};
