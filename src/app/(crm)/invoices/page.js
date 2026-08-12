"use client";

import classes from "./page.module.css";
import Pagination from "@/components/bookings/Pagination";
import { useEffect, useMemo, useState } from "react";
import BookingApiServices from "@/services/api/Booking.api.services";
import BookingTable2 from "@/components/bookings/BookingTable2";

function page() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBookings, setTotalBookings] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const totalPages = useMemo(() => {
    return Math.ceil(totalBookings / limit);
  }, [totalBookings, limit]);

  const buildQuery = () => {
    const params = new URLSearchParams();
    params.append("page", currentPage);
    params.append("limit", limit);

    return `?${params.toString()}`;
  };

  const fetchBookings = async () => {
    const url = buildQuery();
    setLoading(true);
    try {
      const data = await BookingApiServices.getRaisedInvoiceBookings(url);
      setLoading(false);
      setBookings(data?.bookings || []);
      setTotalBookings(data.totalBookings);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, limit]);
  return (
    <div className={classes.container}>
      <div className={classes.pageHeader}>
        <div>
          <h1 style={{ marginBottom: 0 }} className={classes.title}>
            Pending Booking Invoices
          </h1>
          <p className={classes.subtitle}>
            Manage and track all the pending invoices.
          </p>
        </div>
      </div>
      <BookingTable2 bookings={bookings} loading={loading} />

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        totalCount={totalBookings}
        limit={limit}
        onPageChange={setCurrentPage}
        onLimitChange={(value) => {
          setLimit(value);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}

export default page;
