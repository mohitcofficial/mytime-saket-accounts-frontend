"use client";

import BookingApiServices from "@/services/api/Booking.api.services";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "./UpdateClientModal.module.css";

export default function AddClientModal({
  bookingID,
  onClose,
  fetchBookingData,
}) {
  const [loading, setLoading] = useState(false);
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
    isSigningAuthority: true,
    panNumber: "",
    aadhaarNumber: "",
    remark: "",
  });

  const handleClientChange = (e) => {
    const { name, value, type, checked } = e.target;

    setClientData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const data = await BookingApiServices.addClient(clientData, bookingID);
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
            <h2 className={styles.heading}>Update Client Details</h2>

            {/* <p className={styles.subHeading}>Update booking information</p> */}
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}

        <div className={styles.grid3}>
          <div className={styles.box}>
            <label className={styles.label}>Client Name*</label>
            <input
              className={styles.inputField}
              placeholder="Name"
              name="name"
              value={clientData.name}
              onChange={handleClientChange}
            />
          </div>

          <div className={styles.box}>
            <label className={styles.label}>Client Email</label>
            <input
              className={styles.inputField}
              placeholder="Email"
              name="email"
              value={clientData.email}
              onChange={handleClientChange}
            />
          </div>

          <div className={styles.box}>
            <label className={styles.label}>Client Phone</label>
            <input
              className={styles.inputField}
              placeholder="Phone"
              name="phone"
              value={clientData.phone}
              onChange={handleClientChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Aadhaar No.</label>

            <input
              className={styles.inputField}
              placeholder="Aadhar Number"
              name="aadhaarNumber"
              value={clientData.aadhaarNumber}
              onChange={handleClientChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>PAN No.</label>
            <input
              className={styles.inputField}
              placeholder="PAN No."
              name="panNumber"
              value={clientData.panNumber}
              onChange={handleClientChange}
            />
          </div>
          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="isSigningAuthority"
              checked={clientData.isSigningAuthority}
              onChange={handleClientChange}
            />
            Is Signing Authority
          </label>
        </div>

        <div className={styles.box} style={{ marginTop: "16px" }}>
          <label className={styles.label}>Remark</label>
          <textarea
            className={styles.textarea}
            name="remark"
            placeholder="Client Remark"
            value={clientData.remark}
            onChange={handleClientChange}
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
            {loading ? "Adding..." : "Add Client"}
          </button>
        </div>
      </div>
    </div>
  );
}
