"use client";

import { statusMap } from "@/data/Maps";
import classes from "./BookingTable.module.css";
import Link from "next/link";
import { formatDate } from "@/utils/helper";

export default function BookingTable2({ bookings, loading = false }) {
  return (
    <div className={classes.tableContainer}>
      <div className={classes.tableWrapper}>
        {loading && (
          <div className={classes.loaderContainer}>
            <div className={classes.loader}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle
                  fill="#4D32B3"
                  stroke="#4D32B3"
                  strokeWidth="15"
                  r="15"
                  cx="40"
                  cy="100"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.4"
                  ></animate>
                </circle>
                <circle
                  fill="#4D32B3"
                  stroke="#4D32B3"
                  strokeWidth="15"
                  r="15"
                  cx="100"
                  cy="100"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="-.2"
                  ></animate>
                </circle>
                <circle
                  fill="#4D32B3"
                  stroke="#4D32B3"
                  strokeWidth="15"
                  r="15"
                  cx="160"
                  cy="100"
                >
                  <animate
                    attributeName="opacity"
                    calcMode="spline"
                    dur="2"
                    values="1;0;1;"
                    keySplines=".5 0 .5 1;.5 0 .5 1"
                    repeatCount="indefinite"
                    begin="0"
                  ></animate>
                </circle>
              </svg>
            </div>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Type</th>
              <th>Aggregator</th>
              <th>Company Name</th>
              <th>Booking Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr key={index}>
                <td>
                  <Link href={`/booking/${booking?._id}`}>
                    <span className={classes.bookingID}>
                      {booking.bookingID}
                    </span>
                  </Link>
                </td>
                <td>
                  <span
                    className={`${classes.type}
                    ${booking.isRenewal ? classes.renewal : classes.new}`}
                  >
                    {booking.isRenewal ? "Renewal" : "New"}
                  </span>
                </td>
                <td>
                  <span className={booking?.aggregator && classes.highlight}>
                    {booking?.aggregator?.name}
                  </span>
                </td>
                <td>{booking?.companyName}</td>
                <td>{formatDate(booking.bookingDate)}</td>

                <td>
                  <span
                    className={classes.status}
                    style={{
                      color: statusMap[booking.status]?.color,
                      backgroundColor: statusMap[booking.status]?.bgColor,
                    }}
                  >
                    {statusMap[booking.status]?.label}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
