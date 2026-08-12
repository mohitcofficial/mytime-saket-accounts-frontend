"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";
import BookingFilters from "@/components/bookings/BookingFilters";
import BookingTable from "@/components/bookings/BookingTable";
import Pagination from "@/components/bookings/Pagination";
import AddIcon from "@mui/icons-material/Add";
import BookingApiServices from "@/services/api/Booking.api.services";
import Link from "next/link";

export default function Page() {
  const [filters, setFilters] = useState({
    companyName: "",
    bookingId: "",
    clientName: "",
  });

  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalBookings, setTotalBookings] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const fetchBookings = async () => {
    const url = buildQuery();
    setLoading(true);
    try {
      const data = await BookingApiServices.searchBookings(url);
      setLoading(false);
      setBookings(data?.bookings || []);
      setTotalBookings(data.totalRecords);
    } catch (error) {
      setLoading(false);
    }
  };

  const onClear = () => {
    setFilters({
      companyName: "",
      bookingId: "",
      clientName: "",
    });

    setDateRange({
      startDate: null,
      endDate: null,
    });
  };

  const handleApplyFilters = async () => {
    if (currentPage === 1) fetchBookings();
    else setCurrentPage(1);
  };

  const totalPages = useMemo(() => {
    return Math.ceil(totalBookings / limit);
  }, [totalBookings, limit]);

  const buildQuery = () => {
    const params = new URLSearchParams();

    if (filters.companyName) params.append("companyName", filters.companyName);

    if (filters.clientName) params.append("clientName", filters.clientName);

    if (filters.bookingId) params.append("bookingID", filters.bookingId);

    if (dateRange.startDate)
      params.append("startDate", dateRange.startDate.toISOString());

    if (dateRange.endDate)
      params.append("endDate", dateRange.endDate.toISOString());

    params.append("page", currentPage);
    params.append("limit", limit);

    return `?${params.toString()}`;
  };

  useEffect(() => {
    fetchBookings();
  }, [currentPage, limit]);

  return (
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <div>
          <h1 style={{ marginBottom: 0 }} className={styles.title}>
            Bookings
          </h1>
          <p className={styles.subtitle}>Manage and track all bookings</p>
        </div>

        <Link href={"/booking/create"}>
          <button className={styles.newBookingBtn}>
            <AddIcon />
            <span>New Booking</span>
          </button>
        </Link>
      </div>

      <BookingFilters
        filters={filters}
        setFilters={setFilters}
        dateRange={dateRange}
        setDateRange={setDateRange}
        onApply={handleApplyFilters}
        onClear={onClear}
        loading={loading}
      />

      <BookingTable bookings={bookings} loading={loading} />

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
