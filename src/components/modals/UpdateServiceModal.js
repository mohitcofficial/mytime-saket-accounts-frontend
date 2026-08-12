"use client";

import { useState } from "react";
import styles from "./UpdateServiceModal.module.css";
import { toast } from "react-toastify";
import { formatDateForInput } from "@/utils/helper";
import BookingApiServices from "@/services/api/Booking.api.services";

export default function UpdateserviceModal({
  service,
  onClose,
  fetchBookingData,
}) {
  const [serviceData, setServiceData] = useState({ ...service });
  const [paymentData, setPaymentData] = useState({ ...service?.paymentID });
  const [invoiceData, setInvoiceData] = useState({
    ...service?.paymentID?.invoiceID,
  });
  const [loading, setLoading] = useState(false);

  const handleServiceChange = (e) => {
    const { name, value, type, checked } = e.target;

    setServiceData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handlePaymentChange = (e) => {
    const { name, value, type, checked } = e.target;

    setPaymentData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleInvoiceChange = (e) => {
    const { name, value, type, checked } = e.target;

    setInvoiceData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async () => {
    try {
      setLoading(true);
      const data = await BookingApiServices.updateService(
        {
          serviceData,
          paymentData,
          invoiceData,
        },
        service._id,
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
            <h2 className={styles.heading}>Update Service Details</h2>

            {/* <p className={styles.subHeading}>Update booking information</p> */}
          </div>

          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Body */}

        <div className={styles.grid3}>
          <div className={styles.box}>
            <label className={styles.label}>Type</label>

            <select
              className={styles.selectOption}
              name="type"
              value={serviceData.type}
              onChange={handleServiceChange}
            >
              <option value="business_registration">
                Business Registration
              </option>
              <option value="gst_registration">GST Registration</option>
              <option value="mailing_address">Mailing Address</option>
              <option value="company_incorporation">
                Company Incorporation
              </option>
              <option value="permanent_signage">Permanent Signage</option>
              <option value="redocumentation">Re-Documentation</option>
              <option value="ca_service">CA Service</option>
              <option value="authorized_representative">
                Authorized Representative
              </option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>
        <div className={styles.box} style={{ marginTop: "16px" }}>
          <label className={styles.label}>Remark</label>
          <textarea
            className={styles.textarea}
            name="remark"
            placeholder="Service Remark"
            value={serviceData.remark}
            onChange={handleServiceChange}
          />
        </div>

        <div className={styles.grid5}>
          <div className={styles.box}>
            <label className={styles.label}>Type</label>
            <select
              className={styles.selectOption}
              name="type"
              value={paymentData.type}
              onChange={handlePaymentChange}
            >
              <option value="upi">UPI</option>
              <option value="cash">Cash</option>
              <option value="neft">NEFT</option>
              <option value="rtgs">RTGS</option>
              <option value="net_banking">Net Banking</option>
              <option value="razorpay">Razorpay</option>
              <option value="cheque">Cheque</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div className={styles.box}>
            <label className={styles.label}>Status</label>
            <select
              className={styles.selectOption}
              name="status"
              value={paymentData.status}
              onChange={handlePaymentChange}
            >
              <option value="unpaid">Unpaid</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial</option>
            </select>
          </div>

          <div className={styles.box}>
            <label className={styles.label}>Amount*</label>
            <input
              className={styles.inputField}
              type="number"
              name="amount"
              placeholder="Amount"
              value={paymentData.amount}
              onChange={handlePaymentChange}
            />
          </div>

          <div className={styles.box}>
            <label className={styles.label}>Pending Amount</label>
            <input
              className={styles.inputField}
              type="number"
              name="pendingAmount"
              placeholder="Pending Amount"
              value={paymentData.pendingAmount}
              onChange={handlePaymentChange}
            />
          </div>

          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="withGST"
              checked={paymentData.withGST}
              onChange={handlePaymentChange}
            />
            With GST
          </label>
        </div>

        <div className={styles.box} style={{ marginTop: "16px" }}>
          <label className={styles.label}>Remark</label>
          <textarea
            className={styles.textarea}
            name="remark"
            placeholder="Payment Remark"
            value={paymentData.remark}
            onChange={handlePaymentChange}
          />
        </div>

        <div className={styles.grid3}>
          <div className={styles.box}>
            <label className={styles.label}>Invoice Number</label>
            <input
              className={styles.inputField}
              type="text"
              name="invoiceNumber"
              placeholder="Invoice Number"
              value={invoiceData?.invoiceNumber}
              onChange={handleInvoiceChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Invoice Date</label>
            <input
              className={styles.inputField}
              type="date"
              name="invoiceDate"
              value={invoiceData?.invoiceDate}
              onChange={handleInvoiceChange}
            />
          </div>
          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="isRaised"
              checked={invoiceData?.isRaised}
              onChange={handleInvoiceChange}
            />
            is Raised
          </label>
        </div>

        <div className={styles.box} style={{ marginTop: "16px" }}>
          <label className={styles.label}>Remark</label>
          <textarea
            className={styles.textarea}
            name="remark"
            placeholder="Invoice Remark"
            value={invoiceData?.remark}
            onChange={handleInvoiceChange}
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
