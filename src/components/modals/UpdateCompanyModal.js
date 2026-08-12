"use client";

import { useState } from "react";
import styles from "./UpdateCompanyModal.module.css";
import { toast } from "react-toastify";
import BookingApiServices from "@/services/api/Booking.api.services";

export default function UpdateCompanyModal({
  bookingID,
  company,
  onClose,
  fetchBookingData,
}) {
  const [companyData, setCompanyData] = useState({ ...company });
  const [loading, setLoading] = useState(false);

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;

    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const data = await BookingApiServices.updateCompany(
        {
          companyData,
        },
        bookingID,
        companyData._id,
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
            <h2 className={styles.heading}>Update Company Details</h2>

            {/* <p className={styles.subHeading}>Update booking information</p> */}
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}

        <div className={styles.grid3}>
          <div className={styles.box}>
            <label className={styles.label}>Company Name*</label>
            <input
              className={styles.inputField}
              placeholder="Company Name"
              name="name"
              value={companyData.name}
              onChange={handleCompanyChange}
            />
          </div>

          <div className={styles.box}>
            <label className={styles.label}>Firm Type*</label>
            <select
              className={styles.selectOption}
              name="type"
              value={companyData.type}
              onChange={handleCompanyChange}
            >
              <option value="proprietorship">Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="private_limited">Private Limited</option>
              <option value="llp">LLP</option>
              <option value="opc">OPC</option>
              <option value="section8">Section 8</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className={styles.box}>
            <label className={styles.label}>Company PAN</label>

            <input
              className={styles.inputField}
              placeholder="PAN"
              name="panNumber"
              value={companyData.panNumber}
              onChange={handleCompanyChange}
            />
          </div>

          <div className={styles.box}>
            <label className={styles.label}>GSTIN</label>
            <input
              className={styles.inputField}
              placeholder="GSTIN"
              name="gstin"
              value={companyData.gstin}
              onChange={handleCompanyChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>CIN</label>
            <input
              className={styles.inputField}
              placeholder="GSTIN"
              name="cin"
              value={companyData.cin}
              onChange={handleCompanyChange}
            />
          </div>
        </div>
        <div className={styles.box} style={{ marginTop: "16px" }}>
          <label className={styles.label}>Nature of Business</label>
          <textarea
            className={styles.textarea}
            name="nature"
            placeholder="Nature Of Business"
            value={companyData.nature}
            onChange={handleCompanyChange}
          />
        </div>
        <div className={styles.box} style={{ marginTop: "16px" }}>
          <label className={styles.label}>Remark</label>
          <textarea
            className={styles.textarea}
            name="remark"
            placeholder="Company Remark"
            value={companyData.remark}
            onChange={handleCompanyChange}
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
