"use client";

import classes from "./BookingFilters.module.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;

export default function BookingFilters({
  filters,
  setFilters,
  dateRange,
  setDateRange,
  onApply,
  onClear,
  loading,
}) {
  const MIN_DATE = dayjs("2023-10-01");
  const handleDateChange = (dates) => {
    if (!dates) {
      setDateRange({
        startDate: null,
        endDate: null,
      });

      return;
    }

    setDateRange({
      startDate: dates[0].toDate(),
      endDate: dates[1].toDate(),
    });
  };
  return (
    <div className={classes.card}>
      <div className={classes.grid}>
        <div className={classes.box}>
          <label className={classes.label}>Company Name</label>
          <input
            className={classes.inputField}
            type="text"
            placeholder="Search Company Name"
            value={filters.companyName}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                companyName: e.target.value,
              }))
            }
          />
        </div>

        <div className={classes.box}>
          <label className={classes.label}>Booking ID</label>
          <input
            className={classes.inputField}
            type="text"
            placeholder="Search Booking ID"
            value={filters.bookingId}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                bookingId: e.target.value,
              }))
            }
          />
        </div>

        <div className={classes.box}>
          <label className={classes.label}>Client Name</label>
          <input
            className={classes.inputField}
            type="text"
            placeholder="Search Client Name"
            value={filters.clientName}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                clientName: e.target.value,
              }))
            }
          />
        </div>
        <div className={classes.box}>
          <label className={classes.label}>Date Range</label>

          <RangePicker
            value={
              dateRange.startDate && dateRange.endDate
                ? [dayjs(dateRange.startDate), dayjs(dateRange.endDate)]
                : null
            }
            className={classes.datePicker}
            onChange={handleDateChange}
            format="DD MMM YYYY"
            placeholder={["Start date", "End date"]}
            allowClear
            size="medium"
            disabledDate={(current) => {
              return current && current.isBefore(MIN_DATE, "day");
            }}
            presets={[
              {
                label: "Today",
                value: [dayjs(), dayjs()],
              },
              {
                label: "Last 1 Week",
                value: [dayjs().subtract(7, "day"), dayjs()],
              },
              {
                label: "Last 1 Month",
                value: [dayjs().subtract(1, "month"), dayjs()],
              },
              {
                label: "Last 3 Months",
                value: [dayjs().subtract(3, "month"), dayjs()],
              },
              {
                label: "All Time",
                value: [MIN_DATE, dayjs()],
              },
            ]}
          />
        </div>
      </div>

      <div className={classes.buttonContainer}>
        <button className={classes.clrBtn} onClick={onClear}>
          Clear All
        </button>
        <button
          disabled={loading}
          style={{
            cursor: loading ? "not-allowed" : "pointer",
          }}
          className={classes.filterBtn}
          onClick={onApply}
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
}
