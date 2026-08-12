"use client";

import Link from "next/link";
import styles from "./page.module.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import InfoCard from "@/components/InfoCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BookingApiServices from "@/services/api/Booking.api.services";
import { useParams } from "next/navigation";
import {
  companyTypeMap,
  floorMap,
  paymentMap,
  paymentStatusMap,
  servicesMap,
  statusMap,
} from "@/data/Maps";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { formatDate } from "@/utils/helper";
import EditBookingModal from "@/components/modals/EditBookingModal";
import UpdateserviceModal from "@/components/modals/UpdateServiceModal";
import AddServiceModal from "@/components/modals/AddServiceModal";
import UpdateCompanyModal from "@/components/modals/UpdateCompanyModal";
import UpdateClientModal from "@/components/modals/UpdateClientModal";
import AddClientModal from "@/components/modals/AddClientModal";
import AggregatorApiServices from "@/services/api/Aggregator.api.services";

export default function Page() {
  const [booking, setBooking] = useState({});
  const [service, setService] = useState({});
  const [aggregators, setAggregators] = useState([]);
  const [client, setClient] = useState({});
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const params = useParams();

  const id = params.id;

  const fetchAllAggregators = async () => {
    try {
      const data = await AggregatorApiServices.getAllAggregators();
      setAggregators(data.aggregators);
      console.log(data);
    } catch (error) {
      toast.error("Error while fetching Aggregators");
    }
  };

  const fetchBookingData = async () => {
    setLoading();
    try {
      const data = await BookingApiServices.searchBookingInfo(id);
      setBooking(data?.booking);
      setClients(data?.clients);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  useEffect(() => {
    fetchBookingData();
    fetchAllAggregators();
  }, {});

  return (
    <div className={styles.container}>
      {activeModal === "edit_booking_modal" && (
        <EditBookingModal
          fetchBookingData={fetchBookingData}
          booking={booking}
          onClose={closeModal}
          aggregators={aggregators}
        />
      )}
      {activeModal === "update_service_modal" && (
        <UpdateserviceModal
          fetchBookingData={fetchBookingData}
          service={service}
          onClose={closeModal}
        />
      )}
      {activeModal === "add_service_modal" && (
        <AddServiceModal
          fetchBookingData={fetchBookingData}
          onClose={closeModal}
          bookingID={booking?._id}
        />
      )}
      {activeModal === "update_company_modal" && (
        <UpdateCompanyModal
          bookingID={booking?._id}
          fetchBookingData={fetchBookingData}
          onClose={closeModal}
          company={booking.companyID}
        />
      )}
      {activeModal === "update_client_modal" && (
        <UpdateClientModal
          fetchBookingData={fetchBookingData}
          onClose={closeModal}
          client={client}
        />
      )}
      {activeModal === "add_client_modal" && (
        <AddClientModal
          fetchBookingData={fetchBookingData}
          onClose={closeModal}
          bookingID={booking?._id}
        />
      )}
      {/* Header */}
      <div className={styles.pageHeader}>
        <h1 className={styles.heading}>
          BookingID :
          <span className={styles.bookingID}>
            {booking?.bookingID === "" ? "--" : booking?.bookingID}
          </span>
        </h1>
        <Link href="/bookings" className={styles.backBtn}>
          <ArrowBackIcon />
          Back To Bookings
        </Link>
      </div>

      {/* Booking */}

      <InfoCard
        icon={
          <DataUsageIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#E7DDFC",
              color: "#7055c2",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
        }
        title="Booking Details"
        onClick={() => setActiveModal("edit_booking_modal")}
        buttonIcon={<EditIcon sx={{ fontSize: 14 }} />}
      >
        <div className={styles.grid5}>
          <InfoItem label="Booking ID" value={booking?.bookingID} />

          <InfoItem
            label="Booking Date"
            value={formatDate(booking?.bookingDate)}
          />
          <InfoItem
            label="Aggregator"
            bgColor={"#e7e7e7"}
            value={booking?.aggregator?.name}
          />

          <InfoItem
            label="Status"
            value={statusMap[booking?.status]?.label}
            textColor={statusMap[booking?.status]?.color}
            bgColor={statusMap[booking?.status]?.bgColor}
          />

          <InfoItem label="Tenure" value={booking?.tenure} />

          <InfoItem label="Floor" value={floorMap[booking?.floor]} />
          <InfoItem
            label="Activation Date"
            value={formatDate(booking?.finalDocumentSharingDate)}
          />
          <InfoItem
            label="Effective Date"
            value={formatDate(booking?.effectiveDate)}
          />
          <InfoItem
            label="Expiration Date"
            value={formatDate(booking?.expirationDate)}
          />

          <InfoItem label="Assigned To" value={booking?.assignedTo} />
          <InfoItem
            label="Agreement Availability"
            value={booking?.agreementAvailability}
          />
          <InfoItem label="Is Renewal" value={booking?.isRenewal} />
          <InfoItem label="Renewed" value={booking?.renewed} />
        </div>
        <p style={{ marginTop: "24px" }} className={styles.remark}>
          <span>Remark:</span>
          {booking?.remark}
        </p>
      </InfoCard>

      {/* Services */}

      <InfoCard
        icon={
          <DesignServicesIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#E9EEFF",
              color: "#3368fa",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
        }
        title="Services & Payments"
        onClick={() => {
          setActiveModal("add_service_modal");
        }}
        buttonText="Add Service"
        buttonIcon={<AddIcon sx={{ fontSize: 16 }} />}
      >
        {booking?.services?.map((service, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.serviceHeader}>
              <h3 className={styles.serviceHeading}>
                {servicesMap[service?.type]}
              </h3>

              <button
                onClick={() => {
                  setActiveModal("update_service_modal");
                  setService(service);
                }}
                className={styles.smallBtn}
              >
                <EditIcon />
              </button>
            </div>

            <div className={styles.grid5}>
              <InfoItem
                bgColor={paymentMap[service?.paymentID?.type]?.bgColor}
                textColor={paymentMap[service?.paymentID?.type]?.color}
                label="Payment Mode"
                value={paymentMap[service?.paymentID?.type]?.label}
              />
              <InfoItem
                label="Status"
                bgColor={paymentStatusMap[service?.paymentID?.status]?.bgColor}
                textColor={paymentStatusMap[service?.paymentID?.status]?.color}
                value={paymentStatusMap[service?.paymentID?.status]?.label}
              />

              <InfoItem
                label="Amount"
                value={`₹${service?.paymentID?.amount}`}
              />

              <InfoItem
                label="Pending"
                value={`₹${service?.paymentID?.pendingAmount}`}
              />
              <InfoItem label="With GST" value={service?.paymentID.withGST} />
              <InfoItem
                label="Invoice Number"
                value={service?.paymentID?.invoiceID?.invoiceNumber}
              />

              <InfoItem
                label="Invoice Date"
                value={formatDate(service?.paymentID?.invoiceID?.invoiceDate)}
              />

              <InfoItem
                label="Raised"
                value={service?.paymentID?.invoiceID?.isRaised ? "Yes" : "No"}
              />
            </div>
            <p className={styles.remark}>
              <span>Remark:</span>
              {service?.remark}
            </p>
          </div>
        ))}
      </InfoCard>

      {/* Company */}

      <InfoCard
        icon={
          <BusinessIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#FFE6C9",
              color: "#f87f1c",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
        }
        title="Company Information"
        onClick={() => {
          setActiveModal("update_company_modal");
        }}
        buttonIcon={<EditIcon sx={{ fontSize: 14 }} />}
      >
        <div className={styles.grid5}>
          <InfoItem
            bgColor={"#e7e7e7"}
            label="Company Name"
            value={booking?.companyID?.name}
          />

          <InfoItem
            label="Type"
            value={companyTypeMap[booking?.companyID?.type]}
            bgColor={"#e7e7e7"}
          />

          <InfoItem label="PAN" value={booking?.companyID?.panNumber} />

          <InfoItem label="GSTIN" value={booking?.companyID?.gstin} />
          <InfoItem label="CIN" value={booking?.companyID?.cin} />
        </div>
        <p style={{ marginTop: "24px" }} className={styles.remark}>
          <span>Nature of Business:</span>
          {booking?.companyID?.nature}
        </p>
        <p style={{ marginTop: "24px" }} className={styles.remark}>
          <span>Remark:</span>
          {booking?.companyID?.remark}
        </p>
      </InfoCard>

      {/* Payment Summary */}

      <InfoCard
        icon={
          <CurrencyRupeeIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#00ff001c",
              color: "#006800",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
        }
        title="Payment Summary"
      >
        <div className={styles.grid4}>
          <InfoItem label="Total Services" value={booking?.services?.length} />

          <InfoItem
            label="Received Amount"
            value={`₹ ${booking?.totalAmount}`}
          />

          <InfoItem
            label="Pending Amount"
            value={`₹ ${booking?.services?.reduce(
              (total, service) =>
                total + (Number(service?.paymentID?.pendingAmount) || 0),
              0,
            )}`}
          />
          <InfoItem
            label="Total Amount (-GST)"
            value={`₹${
              (booking?.services?.reduce(
                (total, service) =>
                  total + (Number(service?.paymentID?.pendingAmount) || 0),
                0,
              ) || 0) + (Number(booking?.totalAmount) || 0)
            }`}
          />
        </div>
      </InfoCard>

      {/* Clients */}

      <InfoCard
        icon={
          <PersonIcon
            sx={{
              fontSize: 32,
              backgroundColor: "#ffece9",
              color: "#c71b00",
              padding: "4px",
              borderRadius: "4px",
            }}
          />
        }
        title="Client Information"
        buttonText="Add Client"
        buttonIcon={<AddIcon sx={{ fontSize: 16 }} />}
        onClick={() => {
          setActiveModal("add_client_modal");
        }}
      >
        {clients?.map((client, index) => (
          <div key={index} className={styles.serviceCard}>
            <div className={styles.serviceHeader}>
              <h3 className={styles.serviceHeading}>{client?.name}</h3>

              <button
                onClick={() => {
                  setClient(client);
                  setActiveModal("update_client_modal");
                }}
                className={styles.smallBtn}
              >
                <EditIcon sx={{ fontSize: 20 }} />
              </button>
            </div>
            <div key={index} className={styles.grid5}>
              <InfoItem label="Email" value={client?.email} />
              <InfoItem label="Phone" value={client?.phone} />
              <InfoItem
                label="Signing Authority"
                value={client?.isSigningAuthority}
              />
              <InfoItem label="Aadhar No." value={client?.aadhaarNumber} />
              <InfoItem label="PAN No." value={client?.panNumber} />
            </div>
            <p className={styles.remark}>
              <span>Remark:</span>
              {client?.remark}
            </p>
          </div>
        ))}
      </InfoCard>
    </div>
  );
}

function InfoItem({ label, value, textColor, bgColor }) {
  var displayValue =
    typeof value === "boolean" ? (value ? "Yes" : "No") : value;

  if (displayValue === "true") displayValue = "Yes";
  else if (displayValue === "false") displayValue = "No";

  return (
    <div className={styles.infoItem}>
      <span className={styles.label}>{label}</span>
      <span
        // style={textColor ? { color: textColor } : {}}
        style={
          bgColor
            ? {
                color: textColor,
                backgroundColor: bgColor,
                padding: "2px 6px",
                borderRadius: "4px",
              }
            : {}
        }
        className={styles.data}
      >
        {displayValue || "--"}
      </span>
    </div>
  );
}
