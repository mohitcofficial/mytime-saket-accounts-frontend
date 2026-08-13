"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import AddIcon from "@mui/icons-material/Add";
import Link from "next/link";
import { toast } from "react-toastify";
import BookingApiServices from "@/services/api/Booking.api.services";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AggregatorApiServices from "@/services/api/Aggregator.api.services";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [bookingData, setBookingData] = useState({
    bookingID: "",
    bookingDate: "",
    aggregator: "",
    status: "documents_pending",
    tenure: "12 Months",
    finalDocumentSharingDate: "",
    effectiveDate: "",
    expirationDate: "",
    floor: "second",
    assignedTo: "",
    agreementAvailability: false,
    isRenewal: false,
    renewed: false,
    remark: "",
  });

  const [serviceData, setServiceData] = useState({
    type: "business_registration",
    remark: "",
  });

  const [companyData, setCompanyData] = useState({
    name: "",
    type: "proprietorship",
    nature: "",
    panNumber: "",
    gstin: "",
    cin: "",
    remark: "",
  });

  const [clients, setClients] = useState([
    {
      name: "",
      email: "",
      phone: "",
      isSigningAuthority: true,
      panNumber: "",
      aadhaarNumber: "",
      remark: "",
    },
  ]);

  const [paymentData, setPaymentData] = useState({
    type: "upi",
    withGST: true,
    amount: "",
    pendingAmount: "",
    status: "unpaid",
    remark: "",
  });

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: "",
    isRaised: false,
    invoiceDate: "",
    remark: "",
  });

  const [aggregators, setAggregators] = useState([]);

  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;

    setBookingData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleServiceChange = (e) => {
    const { name, value } = e.target;

    setServiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;

    setCompanyData((prev) => ({
      ...prev,
      [name]: value,
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

  const handleClientChange = (index, e) => {
    const { name, value, type, checked } = e.target;

    setClients((prev) =>
      prev.map((client, i) =>
        i === index
          ? {
              ...client,
              [name]: type === "checkbox" ? checked : value,
            }
          : client,
      ),
    );
  };

  const addClient = () => {
    setClients((prev) => [
      ...prev,
      {
        name: "",
        email: "",
        phone: "",
        isSigningAuthority: false,
        panNumber: "",
        aadhaarNumber: "",
        remark: "",
      },
    ]);
  };

  const removeClient = (index) => {
    if (clients.length === 1) return;

    setClients((prev) => prev.filter((_, i) => i !== index));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!companyData.name.trim()) {
      toast.error("Company Name is mandatory !", {
        position: "bottom-right",
      });
      return;
    }

    const hasInvalidClient = clients.some((client) => !client.name.trim());
    if (hasInvalidClient) {
      toast.error("Client Name is mandatory for all clients !", {
        position: "bottom-right",
      });
      return;
    }

    const payload = {
      bookingData,
      serviceData,
      companyData,
      clients,
      paymentData,
      invoiceData,
    };

    try {
      const data = await BookingApiServices.createBooking(payload);
      router.push("/bookings");
      toast.success(data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const fetchAllAggregators = async () => {
    try {
      const data = await AggregatorApiServices.getAllAggregators();
      setAggregators(data.aggregators);
      // console.log(data);
    } catch (error) {
      toast.error("Error while fetching Aggregators");
    }
  };

  useEffect(() => {
    fetchAllAggregators();
  }, {});

  return (
    <form onSubmit={submitHandler} className={styles.container}>
      <div className={styles.header}>
        <h1 style={{ marginBottom: 0 }} className={styles.heading}>
          New Booking
        </h1>
        <div className={styles.buttonContainer}>
          <Link href={"/bookings"}>
            <button className={styles.cancelBtn}>Cancel</button>
          </Link>
          <button className={styles.saveBtn}>Create Booking</button>
        </div>
      </div>

      {/* BOOKING DATA */}

      <section className={styles.card}>
        <div className={styles.headingContainer}>
          <DataUsageIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#E7DDFC",
              color: "#7055c2",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
          <h2 className={styles.heading2}>Booking Data</h2>
        </div>
        <div className={styles.grid5}>
          <div className={styles.box}>
            <label className={styles.label}>Booking ID*</label>
            <input
              className={styles.inputField}
              name="bookingID"
              placeholder="Booking ID"
              value={bookingData.bookingID}
              onChange={handleBookingChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Booking Date*</label>
            <input
              className={styles.inputField}
              type="date"
              name="bookingDate"
              value={bookingData.bookingDate}
              onChange={handleBookingChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Aggregator*</label>
            <select
              className={styles.selectOption}
              name="aggregator"
              value={bookingData.aggregator}
              onChange={handleBookingChange}
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
              value={bookingData.status}
              onChange={handleBookingChange}
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
              value={bookingData.tenure}
              onChange={handleBookingChange}
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
              value={bookingData.floor}
              onChange={handleBookingChange}
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
              value={bookingData.finalDocumentSharingDate}
              onChange={handleBookingChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Effective Date</label>
            <input
              className={styles.inputField}
              type="date"
              name="effectiveDate"
              value={bookingData.effectiveDate}
              onChange={handleBookingChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Expiration Date</label>
            <input
              className={styles.inputField}
              type="date"
              name="expirationDate"
              value={bookingData.expirationDate}
              onChange={handleBookingChange}
            />
          </div>
          <div className={styles.box}>
            <label className={styles.label}>Assigned To</label>
            <select
              className={styles.selectOption}
              name="assignedTo"
              value={bookingData.assignedTo}
              onChange={handleBookingChange}
            >
              <option value="">Assigned To</option>
            </select>
          </div>
          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="agreementAvailability"
              checked={bookingData.agreementAvailability}
              onChange={handleBookingChange}
            />
            Agreement Availibility
          </label>
          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="isRenewal"
              checked={bookingData.isRenewal}
              onChange={handleBookingChange}
            />
            Is Renewal
          </label>

          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="renewed"
              checked={bookingData.renewed}
              onChange={handleBookingChange}
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
            onChange={handleBookingChange}
          />
        </div>
      </section>

      {/* SERVICE DATA */}
      <section className={styles.card}>
        <div className={styles.headingContainer}>
          <DesignServicesIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#E9EEFF",
              color: "#3368fa",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
          <h2 className={styles.heading2}>Service Data</h2>
        </div>

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
      </section>

      {/* COMPANY */}

      <section className={styles.card}>
        <div className={styles.headingContainer}>
          <BusinessIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#FFE6C9",
              color: "#f87f1c",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
          <h2 className={styles.heading2}>Company Data</h2>
        </div>
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
      </section>

      {/* CLIENTS */}

      <section className={styles.card}>
        <div className={`${styles.heading2} ${styles.sectionHeader}`}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <PersonIcon
              sx={{
                fontSize: 32,
                backgroundColor: "#ffece9",
                color: "#c71b00",
                padding: "4px",
                borderRadius: "4px",
              }}
            />
            <h2 style={{ fontSize: "20px", marginBlock: 0 }}>Clients</h2>
          </div>

          <button type="button" onClick={addClient} className={styles.addBtn}>
            <AddIcon />
            <span>Add Client</span>
          </button>
        </div>

        {clients.map((client, index) => (
          <div key={index} className={styles.clientCard}>
            <div className={styles.grid3}>
              <div className={styles.box}>
                <label className={styles.label}>Client Name*</label>
                <input
                  className={styles.inputField}
                  placeholder="Name"
                  name="name"
                  value={client.name}
                  onChange={(e) => handleClientChange(index, e)}
                />
              </div>

              <div className={styles.box}>
                <label className={styles.label}>Client Email</label>
                <input
                  className={styles.inputField}
                  placeholder="Email"
                  name="email"
                  value={client.email}
                  onChange={(e) => handleClientChange(index, e)}
                />
              </div>

              <div className={styles.box}>
                <label className={styles.label}>Client Phone</label>
                <input
                  className={styles.inputField}
                  placeholder="Phone"
                  name="phone"
                  value={client.phone}
                  onChange={(e) => handleClientChange(index, e)}
                />
              </div>
              <div className={styles.box}>
                <label className={styles.label}>Aadhaar No.</label>

                <input
                  className={styles.inputField}
                  placeholder="Aadhar Number"
                  name="aadhaarNumber"
                  value={client.aadhaarNumber}
                  onChange={(e) => handleClientChange(index, e)}
                />
              </div>
              <div className={styles.box}>
                <label className={styles.label}>PAN No.</label>
                <input
                  className={styles.inputField}
                  placeholder="PAN No."
                  name="panNumber"
                  value={client.panNumber}
                  onChange={(e) => handleClientChange(index, e)}
                />
              </div>
              <label className={styles.checkBoxLabel}>
                <input
                  type="checkbox"
                  name="isSigningAuthority"
                  checked={client.isSigningAuthority}
                  onChange={(e) => handleClientChange(index, e)}
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
                value={client.remark}
                onChange={(e) => handleClientChange(index, e)}
              />
            </div>
            {clients.length > 1 && (
              <button
                type="button"
                className={styles.deleteBtn}
                onClick={() => removeClient(index)}
              >
                Remove
              </button>
            )}
          </div>
        ))}
      </section>

      {/* PAYMENT */}
      <section className={styles.card}>
        <div className={styles.headingContainer}>
          <CurrencyRupeeIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#00ff001c",
              color: "#006800",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
          <h2 className={styles.heading2}>Payment Data</h2>
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
      </section>

      {/* INVOICE */}
      <section className={styles.card}>
        <div className={styles.headingContainer}>
          <ReceiptIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#00ccff1c",
              color: "#00abb1",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
          <h2 className={styles.heading2}>Invoice Data</h2>
        </div>

        <div className={styles.grid3}>
          <div className={styles.box}>
            <label className={styles.label}>Invoice Number</label>
            <input
              className={styles.inputField}
              type="text"
              name="invoiceNumber"
              placeholder="Invoice Number"
              value={invoiceData.invoiceNumber}
              onChange={handleInvoiceChange}
            />
          </div>

          <div className={styles.box}>
            <label className={styles.label}>Invoice Date</label>
            <input
              className={styles.inputField}
              type="date"
              name="invoiceDate"
              value={invoiceData.invoiceDate}
              onChange={handleInvoiceChange}
            />
          </div>
          <label className={styles.checkBoxLabel}>
            <input
              type="checkbox"
              name="isRaised"
              checked={invoiceData.isRaised}
              onChange={handleInvoiceChange}
            />
            Invoice Raised
          </label>
        </div>

        <div className={styles.box} style={{ marginTop: "16px" }}>
          <label className={styles.label}>Remark</label>
          <textarea
            className={styles.textarea}
            name="remark"
            placeholder="Invoice Remark"
            value={invoiceData.remark}
            onChange={handleInvoiceChange}
          />
        </div>
      </section>
    </form>
  );
}
