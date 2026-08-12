"use client";

import { useEffect, useState } from "react";
import styles from "./EditBookingModal.module.css";
import { toast } from "react-toastify";
import { formatDateForInput } from "@/utils/helper";
import BookingApiServices from "@/services/api/Booking.api.services";

export default function EditBookingModal({
  booking,
  onClose,
  fetchBookingData,
  aggregators,
}) {
  const [bookingData, setBookingData] = useState({ ...booking });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const data = await BookingApiServices.updateBooking(
        {
          bookingData,
          flag: bookingData.bookingID !== booking.bookingID,
        },
        booking._id,
      );
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
      onClose();
      fetchBookingData();
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}

        <div className={styles.header}>
          <div className={styles.headingContainer}>
            <h2 className={styles.heading}>Edit Booking Details</h2>

            <p className={styles.subHeading}>Update booking information</p>
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}

        <div className={styles.grid5}>
          <div className={styles.box}>
            <label className={styles.label}>Booking ID*</label>
            <input
              className={styles.inputField}
              name="bookingID"
              placeholder="Booking ID"
              value={bookingData?.bookingID}
              onChange={handleChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Booking Date*</label>
            <input
              className={styles.inputField}
              type="date"
              name="bookingDate"
              value={formatDateForInput(bookingData?.bookingDate)}
              onChange={handleChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Aggregator*</label>
            <select
              className={styles.selectOption}
              name="aggregator"
              value={bookingData?.aggregator?._id}
              onChange={handleChange}
            >
              <option value="">Aggregator</option>
              {aggregators?.map((aggregator, index) => (
                <option key={index} value={aggregator._id}>
                  {aggregator.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Status*</label>
            <select
              className={styles.selectOption}
              name="status"
              value={bookingData?.status}
              onChange={handleChange}
            >
              <option value="documents_pending">Documents Pending</option>
              <option value="draft_approval_pending">
                Draft Approval Pending
              </option>
              <option value="sent_for_notary">Sent For Notary</option>
              <option value="countersign_pending">Countersign Pending</option>
              <option value="final_document_shared">Active</option>
              <option value="cancelled">Cancelled</option>
              <option value="hold">Hold</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Tenure*</label>
            <select
              className={styles.selectOption}
              name="tenure"
              value={bookingData?.tenure}
              onChange={handleChange}
            >
              <option value="12 Months">12 Months</option>
              <option value="6 Months">6 Months</option>
              <option value="11 Months">11 Months</option>
              <option value="24 Months">24 Months</option>
              <option value="36 Months">36 Months</option>
            </select>
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Floor</label>
            <select
              className={styles.selectOption}
              name="floor"
              value={bookingData?.floor}
              onChange={handleChange}
            >
              <option value="second">2nd Floor</option>
              <option value="third">3rd Floor</option>
            </select>
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Activation Date</label>
            <input
              className={styles.inputField}
              type="date"
              name="finalDocumentSharingDate"
              value={formatDateForInput(bookingData?.finalDocumentSharingDate)}
              onChange={handleChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Effective Date</label>
            <input
              className={styles.inputField}
              type="date"
              name="effectiveDate"
              value={formatDateForInput(bookingData?.effectiveDate)}
              onChange={handleChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Expiration Date</label>
            <input
              className={styles.inputField}
              type="date"
              name="expirationDate"
              value={formatDateForInput(bookingData.expirationDate)}
              onChange={handleChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Assigned To</label>
            <select
              className={styles.selectOption}
              name="assignedTo"
              value={bookingData.assignedTo}
              onChange={handleChange}
            >
              <option value="">Assigned To</option>
            </select>
          </div>
          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="agreementAvailability"
              checked={bookingData.agreementAvailability}
              onChange={handleChange}
            />
            Agreement Availibility
          </label>
          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="isRenewal"
              checked={bookingData.isRenewal}
              onChange={handleChange}
            />
            Is Renewal
          </label>

          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="renewed"
              checked={bookingData.renewed}
              onChange={handleChange}
            />
            Renewed
          </label>
        </div>
        <div className={styles.box} style={{ marginTop: "16px" }}>
          <label className={styles.label}>Remark</label>

          <textarea
            className={styles.textarea}
            name="remark"
            placeholder="Remark"
            value={bookingData.remark}
            onChange={handleChange}
          />
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>

          <button
            disabled={loading}
            className={styles.saveBtn}
            onClick={submitHandler}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
